import { Link } from "react-router-dom";
import { Collection } from "../components/vehicle/Collection";
import { useVehicles } from "../hooks/useVehicles";

export function Inventory() {
  const { vehicles, status, retry } = useVehicles();
  
  return (
    <main id="main-content" tabIndex={-1} className="route-page">
      <div className="inventory-return">
        <Link className="back-link" to="/">
          ← Back to home
        </Link>
      </div>
      <h1 className="inventory-heading">The showroom.</h1>
      {status === "ready" ? (
        <Collection inventory vehicles={vehicles} />
      ) : (
        <div className="page-loading" role="status">
          {status === "loading" ? (
            "Opening the collection…"
          ) : (
            <>
              <p>The collection could not load.</p>
              <button onClick={retry}>Try again</button>
            </>
          )}
        </div>
      )}
    </main>
  );
}
