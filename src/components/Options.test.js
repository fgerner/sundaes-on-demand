import {render, screen} from "@testing-library/react";
import Options from "./Options";

it('should display image returned from the server',async function () {
    render(<Options optionType={'scoops'}/> )
    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(4);

    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Mint chip scoop', 'Vanilla scoop', 'Chocolate scoop', 'Salted caramel scoop'])
});