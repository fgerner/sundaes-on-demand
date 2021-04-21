import axios from "axios";
import {useEffect, useState} from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from './ToppingOption'
import AlertBanner from './AlertBanner';
import {Row} from "react-bootstrap";

export default function Options({optionType}) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => setError(true))
    }, [optionType]);

    if(error){
        return <AlertBanner />
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const optionItems = items.map((item, i) =>
        <ItemComponent
            key={i}
            name={item.name}
            imagePath={item.imagePath}
        />)
    return <Row>{optionItems}</Row>
}