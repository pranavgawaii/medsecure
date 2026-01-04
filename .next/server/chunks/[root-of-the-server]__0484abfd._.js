module.exports=[93695,(e,t,a)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70406,(e,t,a)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,a)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},51683,e=>{"use strict";var t=e.i(47909),a=e.i(74017),r=e.i(96250),i=e.i(59756),n=e.i(61916),s=e.i(74677),o=e.i(69741),d=e.i(16795),l=e.i(87718),E=e.i(95169),p=e.i(47587),u=e.i(66012),c=e.i(70101),R=e.i(26937),T=e.i(10372),A=e.i(93695);e.i(52474);var N=e.i(220),_=e.i(98323),I=e.i(89171);async function C(){try{let e=process.env.NEON_POSTGRES_URL||process.env.NEON_NEON_DATABASE_URL;if(!e)return I.NextResponse.json({error:"Database URL not configured"},{status:500});let t=(0,_.neon)(e);return await t`
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
    `,I.NextResponse.json({success:!0,message:"Database initialized successfully",tables:["patients","ambulances","vitals","alerts","vital_history"]})}catch(e){return console.error("[v0] Database init error:",e),I.NextResponse.json({error:"Failed to initialize database",details:String(e)},{status:500})}}e.s(["POST",()=>C],21743);var S=e.i(21743);let h=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/init-db/route",pathname:"/api/init-db",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/init-db/route.ts",nextConfigOutput:"",userland:S}),{workAsyncStorage:v,workUnitAsyncStorage:x,serverHooks:O}=h;function m(){return(0,r.patchFetch)({workAsyncStorage:v,workUnitAsyncStorage:x})}async function g(e,t,r){h.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let _="/api/init-db/route";_=_.replace(/\/index$/,"")||"/";let I=await h.prepare(e,t,{srcPage:_,multiZoneDraftMode:!1});if(!I)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:C,params:S,nextConfig:v,parsedUrl:x,isDraftMode:O,prerenderManifest:m,routerServerContext:g,isOnDemandRevalidate:M,revalidateOnlyGenerated:w,resolvedPathname:b,clientReferenceManifest:L,serverActionsManifest:f}=I,P=(0,o.normalizeAppPath)(_),U=!!(m.dynamicRoutes[P]||m.routes[b]),D=async()=>((null==g?void 0:g.render404)?await g.render404(e,t,x,!1):t.end("This page could not be found"),null);if(U&&!O){let e=!!m.routes[b],t=m.dynamicRoutes[P];if(t&&!1===t.fallback&&!e){if(v.experimental.adapterPath)return await D();throw new A.NoFallbackError}}let y=null;!U||h.isDev||O||(y="/index"===(y=b)?"/":y);let F=!0===h.isDev||!U,H=U&&!F;f&&L&&(0,s.setManifestsSingleton)({page:_,clientReferenceManifest:L,serverActionsManifest:f});let k=e.method||"GET",V=(0,n.getTracer)(),j=V.getActiveScopeSpan(),q={params:S,prerenderManifest:m,renderOpts:{experimental:{authInterrupts:!!v.experimental.authInterrupts},cacheComponents:!!v.cacheComponents,supportsDynamicResponse:F,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:v.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r,i)=>h.onRequestError(e,t,r,i,g)},sharedContext:{buildId:C}},X=new d.NodeNextRequest(e),K=new d.NodeNextResponse(t),B=l.NextRequestAdapter.fromNodeNextRequest(X,(0,l.signalFromNodeResponse)(t));try{let s=async e=>h.handle(B,q).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=V.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==E.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route");if(r){let t=`${k} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t)}else e.updateName(`${k} ${_}`)}),o=!!(0,i.getRequestMeta)(e,"minimalMode"),d=async i=>{var n,d;let l=async({previousCacheEntry:a})=>{try{if(!o&&M&&w&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await s(i);e.fetchMetrics=q.renderOpts.fetchMetrics;let d=q.renderOpts.pendingWaitUntil;d&&r.waitUntil&&(r.waitUntil(d),d=void 0);let l=q.renderOpts.collectedTags;if(!U)return await (0,u.sendResponse)(X,K,n,q.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(n.headers);l&&(t[T.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==q.renderOpts.collectedRevalidate&&!(q.renderOpts.collectedRevalidate>=T.INFINITE_CACHE)&&q.renderOpts.collectedRevalidate,r=void 0===q.renderOpts.collectedExpire||q.renderOpts.collectedExpire>=T.INFINITE_CACHE?void 0:q.renderOpts.collectedExpire;return{value:{kind:N.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await h.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:M})},!1,g),t}},E=await h.handleResponse({req:e,nextConfig:v,cacheKey:y,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:m,isRoutePPREnabled:!1,isOnDemandRevalidate:M,revalidateOnlyGenerated:w,responseGenerator:l,waitUntil:r.waitUntil,isMinimalMode:o});if(!U)return null;if((null==E||null==(n=E.value)?void 0:n.kind)!==N.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==E||null==(d=E.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",M?"REVALIDATED":E.isMiss?"MISS":E.isStale?"STALE":"HIT"),O&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let A=(0,c.fromNodeOutgoingHttpHeaders)(E.value.headers);return o&&U||A.delete(T.NEXT_CACHE_TAGS_HEADER),!E.cacheControl||t.getHeader("Cache-Control")||A.get("Cache-Control")||A.set("Cache-Control",(0,R.getCacheControlHeader)(E.cacheControl)),await (0,u.sendResponse)(X,K,new Response(E.value.body,{headers:A,status:E.value.status||200})),null};j?await d(j):await V.withPropagatedContext(e.headers,()=>V.trace(E.BaseServerSpan.handleRequest,{spanName:`${k} ${_}`,kind:n.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},d))}catch(t){if(t instanceof A.NoFallbackError||await h.onRequestError(e,t,{routerKind:"App Router",routePath:P,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:M})},!1,g),U)throw t;return await (0,u.sendResponse)(X,K,new Response(null,{status:500})),null}}e.s(["handler",()=>g,"patchFetch",()=>m,"routeModule",()=>h,"serverHooks",()=>O,"workAsyncStorage",()=>v,"workUnitAsyncStorage",()=>x],51683)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0484abfd._.js.map