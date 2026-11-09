import { Component, lazy, Suspense } from "react";
import type { ReactNode } from "react";

const Visual = lazy(() => import("../ProjectVisual"));
class ExhibitBoundary extends Component<{children:ReactNode},{failed:boolean}> {
  state = {failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed ? <div className="a-exhibit-loading" role="alert"><p>The interactive exhibit could not load. The case-study text and source links remain available.</p><button onClick={()=>location.reload()}>Reload the exhibit</button></div> : this.props.children;}
}
export default function AsyncProjectVisual({id}:{id:string}) {
 return <ExhibitBoundary key={id}><Suspense fallback={<div className="a-exhibit-loading" role="status">Loading the research exhibit…</div>}><Visual id={id}/></Suspense></ExhibitBoundary>;
}
