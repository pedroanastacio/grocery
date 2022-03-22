import { createConnection } from "typeorm";

(async() => {
    try {
        await createConnection();
        import('./app')
    } catch (e) {
        console.log(e);
    }
})()

