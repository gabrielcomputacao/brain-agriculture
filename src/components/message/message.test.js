import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Message } from './index.tsx';

describe("test compoenent Message", () =>{

    test("message", () =>{

        render(<Message status='error' />)
        
        const ContainerMessage = screen.getByTestId('msg')

        expect(ContainerMessage).toHaveStyle('background-color: red')

    })

})
