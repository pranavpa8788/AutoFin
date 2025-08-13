import { Tile } from './tile.component'
import HomeController from '../controller/home.controller';

export default function Home() {
    let homeController = new HomeController();
    homeController.initHooks();

    return (
        <Tile onClick={homeController.addTransactionHandler.bind(homeController)}>
            Add transaction
        </Tile>
    );
}