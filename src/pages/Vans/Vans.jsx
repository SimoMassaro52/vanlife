//Import of the async function that makes the fetch request in api.js
import { getVans } from "../../api";
//Suspense is actually a custom component from standard React JS not React Router
import { Suspense } from "react";
import {
	Link,
	useSearchParams,
	useLoaderData,
	defer,
	Await,
} from "react-router-dom";
import "../../App.css";

export function loader() {
	const vansPromise = getVans();
	return defer({ vans: vansPromise });
}

function Vans() {
	// const [vansData, setVansData] = useState([]);
	//We won't need to use a useEffect() anymore
	const vansData = useLoaderData();
	const [searchParams, setSearchParams] = useSearchParams();

	const typeFilter = searchParams.get("type");

	function displayedVans(vans) {
		const filteredVans = typeFilter
			? vans.filter((van) => van.type === typeFilter)
			: vans;

		const vanElements = filteredVans.map((van) => (
			<Link
				to={`/vans/${van.id}`}
				key={van.id}
				state={{ search: searchParams.toString() }}
			>
				<div className="van-tile">
					<img src={van.imageUrl} />
					<div className="van-info">
						<h3>{van.name}</h3>
						<p>
							${van.price}
							<span>/day</span>
						</p>
					</div>
					<i className={`van-type ${van.type} selected`}>
						{van.type.charAt(0).toUpperCase() + van.type.slice(1)}
					</i>
				</div>
			</Link>
		));
		return (
			<>
				<div className="vans-explore-box">
					<h1>Explore our van options</h1>
					<div className="explore-filters-box">
						<button
							onClick={() => setSearchParams({ type: "simple" })}
							className={`filter-sim ${
								typeFilter == "simple" ? "selected" : ""
							}`}
						>
							Simple
						</button>
						<button
							onClick={() => setSearchParams({ type: "luxury" })}
							className={`filter-lux ${
								typeFilter == "luxury" ? "selected" : ""
							}`}
						>
							Luxury
						</button>
						<button
							onClick={() => setSearchParams({ type: "rugged" })}
							className={`filter-rug ${
								typeFilter == "rugged" ? "selected" : ""
							}`}
						>
							Rugged
						</button>
						{typeFilter !== null ? (
							<button className="clear-btn" onClick={() => setSearchParams({})}>
								Clear filters
							</button>
						) : (
							""
						)}
					</div>
				</div>
				<div className="van-tiles-box">{vanElements}</div>
			</>
		);
	}
	return (
		<main className="vans-wrapper">
			<Suspense fallback={<h1>Loading...</h1>}>
				<Await resolve={vansData.vans}>{displayedVans}</Await>
			</Suspense>
		</main>
	);
}

export default Vans;
