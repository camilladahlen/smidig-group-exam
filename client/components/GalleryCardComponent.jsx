import { ArrowButton } from "./ArrowButtonComponent";
import { useState } from "react";
import { BarGraph } from "./BarGraph";
import { useNavigate } from "react-router-dom";

export function GalleryCard({
  percentage,
  selectedCategories,
  company,
  onClick,
  singleCol,
  photos,
}) {
  const [isExpanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const matchingList = () => {
    return (
      <>
        <div className={"column is-narrow"}>
          <ul className={"has-text-left"}>
            {selectedCategories.map((selCat) => {
              return (
                company.categories.findIndex(
                  (np) => np.category.name === selCat.name
                ) !== -1 && (
                  <li>
                    <span className="icon-text">
                      <span className="icon">
                        <i className="fas fa-circle-check has-text-success" />
                      </span>
                      <span>{selCat.name}</span>
                    </span>
                  </li>
                )
              );
            })}
          </ul>
        </div>
        <div className={"column is-narrow"}>
          <ul className={"has-text-left"}>
            {selectedCategories.map((selCat) => {
              return (
                company.categories.findIndex(
                  (np) => np.category.name === selCat.name
                ) === -1 && (
                  <li>
                    <span className="icon-text">
                      <span className="icon">
                        <i className="fas fa-circle-xmark has-text-danger" />
                      </span>
                      <span>{selCat.name}</span>
                    </span>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </>
    );
  };
  const toggleExpanded = () => {
    onClick();
    isExpanded ? setExpanded(false) : setExpanded(true);
  };

  if (singleCol && !isExpanded)
    return (
      <div className={"card is-flex is-flex-direction-column p-5 is-hidden"} />
    );

  function getExtendedInfoPhotos() {
    return (
      <>
        {photos.map((url) => (
          <div className={"image has-text-centered p-3"}>
            <img src={url} alt={"charity image"} />
          </div>
        ))}
      </>
    );
  }

  function renderExtendedDescription() {
    const result = company.viewMoreInfo.extendedInfo.split(/&img&/);
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: result[0] }} />
        <div className={"columns is-flex-direction-row p-4  has-text-centered"}>
          {getExtendedInfoPhotos()}
        </div>
        <div className={"columns"}>
          <div
            className={"column"}
            dangerouslySetInnerHTML={{ __html: result[1] }}
          />
          <div className={"column"}>
            <BarGraph percentage={company.viewMoreInfo.adminPercentage} />
            <p className={"has-text-left is-italic mb-6"}>
              Percentage of funds that went to initiatives vs. administrative
              cost
            </p>
            <div className={"grid-container"}>
              {company.viewMoreInfo.stats &&
                company.viewMoreInfo.stats.map((stat) => (
                  <div>
                    <span className={"icon is-large"}>
                      <i className={`fas fa-2x ${stat.icon}`} />
                    </span>
                    <p className={"is-size-3 has-text-weight-bold mb-1"}>
                      {stat.number}
                    </p>
                    <p className={"is-italic"}>{stat.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={`card is-flex is-flex-direction-column ${
        isExpanded ? "p-6" : "p-4 hoverPop"
      }`}
    >
      {isExpanded && (
        <a
          className={"fa-solid fa-arrow-left is-size-6 has-text-black"}
          onClick={() => toggleExpanded()}
        >
          {" "}
          Back
        </a>
      )}
      <div className="card-image has-text-centered">
        <figure className={"image m-4 is-inline-block "}>
          <img src={company.logo} alt={"Company logo"} />
        </figure>
      </div>
      <div className={"is-size-6 has-text-centered pt-4"}>
        {isExpanded ? (
          <>
            <h3 className={"has-text-danger"}>MATCHES</h3>
            <div className={"columns is-centered"}>{matchingList()}</div>
            <div className={"divider columns is-centered m-5 "} />
          </>
        ) : (
          <div className={"has-text-danger"}>
            {percentage.toFixed(0)}% MATCH
          </div>
        )}
      </div>
      <div className={"content has-text-left is-flex-grow-1 p-4"}>
        {isExpanded ? (
          renderExtendedDescription()
        ) : (
          <div dangerouslySetInnerHTML={{ __html: company.description }} />
        )}
      </div>
      <div className={"is-flex is-justify-content-center p-4"}>
        <ArrowButton
          value={isExpanded ? "Start registration" : "View more"}
          onClick={() =>
            !isExpanded ? toggleExpanded() : navigate("../payments")
          }
        />
      </div>
    </div>
  );
}
