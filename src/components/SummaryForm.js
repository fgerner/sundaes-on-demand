import {Button, Form, Popover, OverlayTrigger} from "react-bootstrap";
import {useState} from "react";

export default function SummaryForm() {
    const [tcChecked, setTcChecked] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                No goods will be delivered
            </Popover.Content>
        </Popover>
    );

    let checkboxLabel = (
        <span>
            I agree to
            <OverlayTrigger overlay={popover}>
                <span style={{color: 'blue'}}>Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    );

    return (
        <Form>
            <Form.Group controlId={'terms-and-conditions'}>
                <Form.Check
                    type={"checkbox"}
                    checked={tcChecked}
                    onChange={(e) => setTcChecked(e.target.checked)}
                    label={checkboxLabel}/>
            </Form.Group>
            <Button variant={'primary'} type={'submit'} disabled={!tcChecked}>Confirm order</Button>
        </Form>
    )
}