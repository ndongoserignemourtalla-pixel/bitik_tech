import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BitikProvider } from "@/lib/bitik-data";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
function NotFound(){return <div className="grid min-h-screen place-items-center bg-app p-6 text-center"><div><span className="text-7xl font-black text-primary">404</span><h1 className="mt-4 text-2xl font-bold">Cette page n’existe pas.</h1><p className="mt-2 text-muted-foreground">Revenez à l’accueil pour poursuivre votre visite.</p><Button asChild className="mt-6"><Link to="/">Retour à l’accueil</Link></Button></div></div>}
function ErrorView({error,reset}:{error:Error;reset:()=>void}){const router=useRouter();useEffect(()=>reportLovableError(error,{boundary:"root"}),[error]);return <div className="grid min-h-screen place-items-center p-6 text-center"><div><h1 className="text-2xl font-bold">Cette page n’a pas pu s’afficher.</h1><p className="mt-2 text-muted-foreground">Réessayez dans un instant.</p><Button className="mt-6" onClick={()=>{router.invalidate();reset()}}>Réessayer</Button></div></div>}
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{name:"author",content:"Bitik Tech"}],links:[{rel:"stylesheet",href:appCss},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap"},{rel:"icon",href:"/favicon.ico"}]}),shellComponent:RootShell,component:Root,notFoundComponent:NotFound,errorComponent:ErrorView});
function RootShell({children}:{children:ReactNode}){return <html lang="fr"><head><HeadContent/></head><body>{children}<Scripts/></body></html>}
function Root(){const{queryClient}=Route.useRouteContext();return <QueryClientProvider client={queryClient}><BitikProvider><Outlet/><Toaster position="top-right" richColors/></BitikProvider></QueryClientProvider>}
