import { Tile } from './tile.component'
import HomeController from '../controller/home.controller';

export default function Home() {
    let homeController = new HomeController();
    homeController.initHooks();

    console.log(`health: ${homeController.healthy}`);
    if (homeController.healthy)
    {
        return (
            <Tile onClick={homeController.addTransactionHandler.bind(homeController)}>
                Add transaction
            </Tile>
        );
    } else {
        return (
            <div>Unable to reach db server</div>
        )
    }
}