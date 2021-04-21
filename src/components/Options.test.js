import {render, screen} from "@testing-library/react";
import Options from "./Options";

test('should display scoop images returned from the server',async function () {
    render(<Options optionType={'scoops'}/> )
    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(4);

    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Mint chip scoop', 'Vanilla scoop', 'Chocolate scoop', 'Salted caramel scoop'])
});

test('should display topping images returned from the server', async function () {
    render(<Options optionType={'toppings'}/> )
    const toppingImages = await screen.findAllByRole('img', {name: /topping$/i});
    expect(toppingImages).toHaveLength(2);

    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual(['M&Ms topping', 'Hot fudge topping']);
});