use actix_files::Files;
use actix_web::{Responder, get, HttpResponse, web, App, HttpServer, middleware};

use lazy_static::lazy_static;
use tera::{Tera, Context};

lazy_static! {

    pub static ref TEMPLATES: Tera = {

        let mut tera = match Tera::new("templates/*") {
            Ok(t) => t,
            Err(e) => {
                println!("Parsing error: {}", e);
                ::std::process::exit(1);
            }
        };
        tera.autoescape_on(vec![".html"]);
        tera
    };

}


#[get("/")]
async fn hello() -> impl Responder {
    let context = Context::new();
    HttpResponse::Ok().body(TEMPLATES.render("hello.html", &context).unwrap())
}


async fn default_handler() -> impl Responder {
    HttpResponse::Ok().body("404. Not found")
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));


    HttpServer::new(|| {
        App::new()
        .wrap(middleware::Logger::default())
        .service(hello)
        .service(Files::new("/assets", "public"))
        .default_service(web::get().to(default_handler))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}