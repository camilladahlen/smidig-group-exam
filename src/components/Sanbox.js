import { useState } from 'react'
import 'bulma/css/bulma.min.css';
import Bubbles from "/Bubbles";
import Header from "/Header";

function Sandbox() {
    const [tags, setTags] = useState([
        {
            id: 1,
            title: "Women's Rights",
            selectionType: 0
        },
        {
            id: 2,
            title: 'Education',
            selectionType: 0
        },
        {
            id: 3,
            title: 'Clean Water',
            selectionType: 0
        },
        {
            id: 4,
            title: 'Human Rights',
            selectionType: 0
        }
    ])

    const toggleSelected = (id) => {
        setTags(tags.map((tag) =>
            tag.id === id ? {...tag, selectionType:
                    tag.selectionType === 2 ? 0 : ++tag.selectionType} : tag
        ))
    }

    return (
        <div>
            <Header/>
            <section className="section bubble-container">
                <Bubbles className="" tags={tags} toggleSelected={toggleSelected}/>
            </section>
        </div>

    );
}

export default Sandbox;