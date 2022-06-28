import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function TagsDropdown () {

    const tags = useSelector((state) => state.tags);
    const tagList  = Object.values(tags);

    return (
        <div className="NavTagContainer">
            <ul>
                <li>
                {tagList.length > 0 &&
                    tagList.map((tag) => (
                    <NavLink
                        to={`/tags/${tag.id}`}>
                        <h3 className="NavTags">
                        <i className="fas fa-solid fa-tag"></i>
                        {tag.label}
                        </h3>
                    </NavLink>
                    ))}
                </li>
            </ul>
        </div>
    );
}

export default TagsDropdown;