module.exports=[93695,(e,t,a)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70406,(e,t,a)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,a)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},51683,e=>{"use strict";var t=e.i(47909),a=e.i(74017),r=e.i(96250),i=e.i(59756),n=e.i(61916),s=e.i(14444),o=e.i(37092),d=e.i(69741),l=e.i(16795),E=e.i(87718),p=e.i(95169),u=e.i(47587),c=e.i(66012),R=e.i(70101),T=e.i(26937),A=e.i(10372),N=e.i(93695);e.i(52474);var _=e.i(220),I=e.i(98323),C=e.i(89171);async function S(){try{let e=process.env.NEON_POSTGRES_URL||process.env.NEON_NEON_DATABASE_URL;if(!e)return C.NextResponse.json({error:"Database URL not configured"},{status:500});let t=(0,I.neon)(e);return await t`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        age INT,
        gender VARCHAR(10),
        medical_conditions VARCHAR(500),
        emergency_contact VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,await t`
      CREATE TABLE IF NOT EXISTS ambulances (
        id SERIAL PRIMARY KEY,
        ambulance_id VARCHAR(50) UNIQUE NOT NULL,
        driver_name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'available',
        current_patient_id VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,await t`
      CREATE TABLE IF NOT EXISTS vitals (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) NOT NULL,
        ambulance_id VARCHAR(50),
        heart_rate INT,
        spo2 DECIMAL(5, 2),
        systolic_bp INT,
        diastolic_bp INT,
        temperature DECIMAL(5, 2),
        status VARCHAR(50),
        encrypted_data TEXT,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
      )
    `,await t`
      CREATE TABLE IF NOT EXISTS alerts (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) NOT NULL,
        alert_type VARCHAR(50),
        alert_level VARCHAR(50),
        message TEXT,
        is_acknowledged BOOLEAN DEFAULT FALSE,
        acknowledged_by VARCHAR(255),
        acknowledged_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
      )
    `,await t`
      CREATE TABLE IF NOT EXISTS vital_history (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) NOT NULL,
        heart_rate_avg INT,
        spo2_avg DECIMAL(5, 2),
        systolic_bp_avg INT,
        diastolic_bp_avg INT,
        temperature_avg DECIMAL(5, 2),
        status VARCHAR(50),
        date_recorded DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
      )
    `,await t`CREATE INDEX IF NOT EXISTS idx_patient_id ON vitals(patient_id)`,await t`CREATE INDEX IF NOT EXISTS idx_ambulance_id ON vitals(ambulance_id)`,await t`CREATE INDEX IF NOT EXISTS idx_recorded_at ON vitals(recorded_at)`,await t`CREATE INDEX IF NOT EXISTS idx_alert_patient_id ON alerts(patient_id)`,await t`CREATE INDEX IF NOT EXISTS idx_alert_created_at ON alerts(created_at)`,await t`
      INSERT INTO patients (patient_id, name, age, gender, medical_conditions) 
      VALUES 
        ('PAT001', 'John Doe', 45, 'M', 'Hypertension'),
        ('PAT002', 'Jane Smith', 52, 'F', 'Diabetes, Heart Disease'),
        ('PAT003', 'Michael Johnson', 38, 'M', 'Asthma')
      ON CONFLICT (patient_id) DO NOTHING
    `,await t`
      INSERT INTO ambulances (ambulance_id, driver_name, status) 
      VALUES 
        ('AMB001', 'Officer Mike', 'available'),
        ('AMB002', 'Officer Sarah', 'available')
      ON CONFLICT (ambulance_id) DO NOTHING
    `,C.NextResponse.json({success:!0,message:"Database initialized successfully",tables:["patients","ambulances","vitals","alerts","vital_history"]})}catch(e){return console.error("[v0] Database init error:",e),C.NextResponse.json({error:"Failed to initialize database",details:String(e)},{status:500})}}e.s(["POST",()=>S],21743);var h=e.i(21743);let v=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/init-db/route",pathname:"/api/init-db",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/init-db/route.ts",nextConfigOutput:"",userland:h}),{workAsyncStorage:x,workUnitAsyncStorage:O,serverHooks:M}=v;function m(){return(0,r.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:O})}async function g(e,t,r){v.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let I="/api/init-db/route";I=I.replace(/\/index$/,"")||"/";let C=await v.prepare(e,t,{srcPage:I,multiZoneDraftMode:!1});if(!C)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:S,params:h,nextConfig:x,parsedUrl:O,isDraftMode:M,prerenderManifest:m,routerServerContext:g,isOnDemandRevalidate:w,revalidateOnlyGenerated:b,resolvedPathname:f,clientReferenceManifest:L,serverActionsManifest:P}=C,U=(0,d.normalizeAppPath)(I),D=!!(m.dynamicRoutes[U]||m.routes[f]),y=async()=>((null==g?void 0:g.render404)?await g.render404(e,t,O,!1):t.end("This page could not be found"),null);if(D&&!M){let e=!!m.routes[f],t=m.dynamicRoutes[U];if(t&&!1===t.fallback&&!e){if(x.experimental.adapterPath)return await y();throw new N.NoFallbackError}}let F=null;!D||v.isDev||M||(F="/index"===(F=f)?"/":F);let H=!0===v.isDev||!D,k=D&&!H;P&&L&&(0,s.setReferenceManifestsSingleton)({page:I,clientReferenceManifest:L,serverActionsManifest:P,serverModuleMap:(0,o.createServerModuleMap)({serverActionsManifest:P})});let V=e.method||"GET",j=(0,n.getTracer)(),q=j.getActiveScopeSpan(),X={params:h,prerenderManifest:m,renderOpts:{experimental:{authInterrupts:!!x.experimental.authInterrupts},cacheComponents:!!x.cacheComponents,supportsDynamicResponse:H,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:x.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r)=>v.onRequestError(e,t,r,g)},sharedContext:{buildId:S}},K=new l.NodeNextRequest(e),B=new l.NodeNextResponse(t),Y=E.NextRequestAdapter.fromNodeNextRequest(K,(0,E.signalFromNodeResponse)(t));try{let s=async e=>v.handle(Y,X).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=j.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route");if(r){let t=`${V} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t)}else e.updateName(`${V} ${I}`)}),o=!!(0,i.getRequestMeta)(e,"minimalMode"),d=async i=>{var n,d;let l=async({previousCacheEntry:a})=>{try{if(!o&&w&&b&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await s(i);e.fetchMetrics=X.renderOpts.fetchMetrics;let d=X.renderOpts.pendingWaitUntil;d&&r.waitUntil&&(r.waitUntil(d),d=void 0);let l=X.renderOpts.collectedTags;if(!D)return await (0,c.sendResponse)(K,B,n,X.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,R.toNodeOutgoingHttpHeaders)(n.headers);l&&(t[A.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==X.renderOpts.collectedRevalidate&&!(X.renderOpts.collectedRevalidate>=A.INFINITE_CACHE)&&X.renderOpts.collectedRevalidate,r=void 0===X.renderOpts.collectedExpire||X.renderOpts.collectedExpire>=A.INFINITE_CACHE?void 0:X.renderOpts.collectedExpire;return{value:{kind:_.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await v.onRequestError(e,t,{routerKind:"App Router",routePath:I,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:w})},g),t}},E=await v.handleResponse({req:e,nextConfig:x,cacheKey:F,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:m,isRoutePPREnabled:!1,isOnDemandRevalidate:w,revalidateOnlyGenerated:b,responseGenerator:l,waitUntil:r.waitUntil,isMinimalMode:o});if(!D)return null;if((null==E||null==(n=E.value)?void 0:n.kind)!==_.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==E||null==(d=E.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",w?"REVALIDATED":E.isMiss?"MISS":E.isStale?"STALE":"HIT"),M&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,R.fromNodeOutgoingHttpHeaders)(E.value.headers);return o&&D||p.delete(A.NEXT_CACHE_TAGS_HEADER),!E.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,T.getCacheControlHeader)(E.cacheControl)),await (0,c.sendResponse)(K,B,new Response(E.value.body,{headers:p,status:E.value.status||200})),null};q?await d(q):await j.withPropagatedContext(e.headers,()=>j.trace(p.BaseServerSpan.handleRequest,{spanName:`${V} ${I}`,kind:n.SpanKind.SERVER,attributes:{"http.method":V,"http.target":e.url}},d))}catch(t){if(t instanceof N.NoFallbackError||await v.onRequestError(e,t,{routerKind:"App Router",routePath:U,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:w})}),D)throw t;return await (0,c.sendResponse)(K,B,new Response(null,{status:500})),null}}e.s(["handler",()=>g,"patchFetch",()=>m,"routeModule",()=>v,"serverHooks",()=>M,"workAsyncStorage",()=>x,"workUnitAsyncStorage",()=>O],51683)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0484abfd._.js.map