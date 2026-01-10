import { SignUp } from "@clerk/nextjs";
import { Shield } from "lucide-react";

export default function Page() {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            {/* Left Side: Branding / Visuals */}
            <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-teal-900 to-slate-900 opacity-90" />

                {/* Abstract Circles */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float animation-delay-4000" />

                <div className="relative z-10 text-white max-w-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="w-12 h-12" />
                        <span className="text-3xl font-bold tracking-tight">MedSecure24</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">Join the Network.</h1>
                    <p className="text-xl text-blue-100 leading-relaxed">
                        Create an account to start securing transmission of critical medical data.
                    </p>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-background to-background dark:from-blue-900/10" />
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-primary hover:bg-primary/90 text-white shadow-lg",
                            card: "shadow-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md rounded-2xl",
                            headerTitle: "text-2xl font-bold text-foreground",
                            headerSubtitle: "text-muted-foreground",
                        }
                    }}
                />
            </div>
        </div>
    );
}
