import { ErrorEntity } from "../models/error.model";

export const OTHER_ERROR: any = {
    404: new ErrorEntity('Error 404', 'Oops...Page Not Found', 'The page you are looking for may have been removed or broken. Click the link on right to redirect to the home page.'),
    500: new ErrorEntity('Error 500', 'Oops...Internal Server Error', 'The interval server may have existed some problems. Click button on right to redirect to the home page.')
};