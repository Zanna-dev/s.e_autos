import { Hero } from './Hero'
import { Collection } from '../../components/vehicle/Collection'
import { DriveFinder } from '../../components/vehicle/DriveFinder'
import { useVehicles } from '../../hooks/useVehicles'
export function Home() {
  const { vehicles, status, retry } = useVehicles()
  return <main id="main-content" tabIndex={-1}>
    {status === 'loading' && <div className="page-loading" role="status">Opening the showroom<span className="loading-line" /></div>}
    {status === 'error' && <div className="page-loading" role="alert"><h1>The showroom couldn’t load.</h1><button className="button primary" onClick={retry}>Try again</button></div>}
    {status === 'ready' && <><Hero vehicles={vehicles} /><div className="experience-ribbon"><span>QUALITY VEHICLES.</span><span className="ribbon-star">✳</span><span>TRUSTED DEALER.</span><span className="ribbon-star">✳</span><span>YOUR NEXT CHAPTER.</span><span className="ribbon-location">ASOKORO / ABUJA</span></div><Collection vehicles={vehicles} /><DriveFinder vehicles={vehicles} /></>}
  </main>
}
