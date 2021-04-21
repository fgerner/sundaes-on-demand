import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import SummaryForm from "./SummaryForm";
import userEvent from '@testing-library/user-event';

describe('Order summary Form', () => {
    it('should render a checkbox', function () {
        render(<SummaryForm/>)
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked()
    });
    it('should render a disabled submit button if checkbox is unchecked', function () {
        render(<SummaryForm/>)
        const submitButton = screen.getByRole('button', {name: 'Confirm order'});
        expect(submitButton).toBeDisabled();
    });
    it('should render a enabled submit button if checkbox is checked', function () {
        render(<SummaryForm/>)
        const submitButton = screen.getByRole('button', {name: 'Confirm order'});
        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);
        expect(submitButton).toBeEnabled();
    });
    it('should render a disabled submit button if checkbox is unchecked again', function () {
        render(<SummaryForm/>)
        const submitButton = screen.getByRole('button', {name: 'Confirm order'});
        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);
        userEvent.click(checkbox);
        expect(submitButton).toBeDisabled()
    });
    it('should open a popover when user hover over checkbox label', async function () {
        render(<SummaryForm/>);
        let popover = await screen.queryByText(/no goods will be delivered/i)
        expect(popover).not.toBeInTheDocument()

        const termsAndConditions = await screen.getByText(/terms and conditions/i);
        userEvent.hover(termsAndConditions)
        popover = await screen.findByText(/no goods will be delivered/i);
        expect(popover).toBeInTheDocument()
    });
    it('should remove the popover when users pointer leaves checkbox label', async function () {
        render(<SummaryForm/>);
        const termsAndConditions = await screen.findByText(/terms and conditions/i);
        userEvent.hover(termsAndConditions)
        let popover = await screen.findByText(/no goods will be delivered/i);
        expect(popover).toBeInTheDocument()

        userEvent.unhover(termsAndConditions)
        await waitForElementToBeRemoved(() =>
            screen.getByText(/no goods will be delivered/i)
        );
    });
})
