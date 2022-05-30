import { ArrowButton } from "./ArrowButtonComponent";

export function PaymentCard({ title, revenue, perks }) {
  return (
    <div className={"card-content card is-flex is-flex-direction-column"}>
      <div className="media-content">
        <p className="title is-4">{title}</p>
        <p className="subtitle is-6 mb-0 pb-1">{revenue}</p>
        {perks}
      </div>
      <div className={"is-flex is-justify-content-center is-narrow"}>
        <ArrowButton value={"Choose plan"} />
      </div>
    </div>
  );
}
