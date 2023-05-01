import dotenv from 'dotenv'
import parseArgs from 'minimist'
import MongoStore from 'connect-mongo'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const argv = parseArgs(process.argv.slice(2), {
    alias: {
        p: 'port',
        m: 'mode'
    },
    default: {
    port: 8070,
    mode: 'FORK'
    }
})

export default {
    PORT: argv.port,
    mode: argv.mode,
    NODE_ENV: 'development',

    mongodbLocal: {
        cnxStr: process.env.CNXSTR,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
     }
    },


    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: __dirname + '/../DB/mensajes.sqlite'
        },
        useNullAsDefault: true
    },
    

    mysql: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT
        }
    },

    fileSystem: {
        path: "contenedor.json"
    },

    mongodb: {
        // Remote
        cnxStr: process.env.MONGO_REMOTE_CNXSTR,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            serverSelectionTimeoutMS: 5000
     }
    },
    session: {
        store: MongoStore.create({
            // local
            mongoUrl: process.env.MONGO_URL
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 10000
        }
    }
}
