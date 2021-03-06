import { Link } from "react-router-dom"
import { bedIconSrc, bathtubIconSrc, EditIcon, DeleteIcon } from "../assets/svg"

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Month"}
            {listing.offer && (
              <span className="categoryListingSpan">
                &nbsp;&nbsp;&nbsp;&nbsp;On Sale!
              </span>
            )}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIconSrc} alt="bed" />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : `${listing.bedrooms} Bedroom`}
            </p>
            <img src={bathtubIconSrc} alt="bath" />
            <p className="categoryListingInfoText">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : `${listing.bathrooms} Bathroom`}
            </p>
          </div>
        </div>
      </Link>
      {onEdit && (
        <EditIcon
          title="edit listing"
          className="editIcon"
          onClick={() => onEdit(listing.id)}
        />
      )}
      {onDelete && (
        <DeleteIcon
          title="delete listing"
          className="removeIcon"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
    </li>
  )
}

export default ListingItem
