import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs');


describe('Pruebas en <GifGrid />', () => {
    const category = 'DragonBall';

    test('debe de mostrar el loading inicialmente', () => {

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        });       
        
        render(<GifGrid category={ category }/>);

        expect(screen.getByText( 'Cargando...' ));
        expect(screen.getByText( category ));
    });

    test('debe de mostrar items cuando se cargan las imagenes useFetchGif', () => {
        
        const gifs = [
            {
                id: 'ABC',
                title: 'Goku',
                url: 'https://localhost/goku.png'
            },
            {
                id: 'CDE',
                title: 'Vegetta',
                url: 'https://localhost/vegetta.png'
            }
        ];

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: true
        });
        
        render(<GifGrid category={ category }/>);

        expect(screen.getAllByRole('img').length).toBe(2);
    });
});