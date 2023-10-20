use std::collections::HashMap;

use actix::{ StreamHandler, Actor };
use actix_files::Files;
use actix_web::{Responder, get, HttpResponse, web, App, HttpServer, middleware, HttpRequest, Error};

use actix_web_actors::ws;
use lazy_static::lazy_static;
use tera::{Tera, Context, to_value};
use serde::Serialize;

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

#[derive(Serialize)]
struct AnalysisJsonData {

}

#[derive(Serialize)]
struct AnalysisViewData {
    data: AnalysisJsonData
}

impl AnalysisViewData {

    fn new() -> Self {
        AnalysisViewData { data: AnalysisJsonData {} }
    }
}

#[get("/analysis")]
async fn analysis() -> impl Responder {
    let mut context = Context::new();
    context.insert("json_data", &AnalysisViewData::new());
    HttpResponse::Ok().body(TEMPLATES.render("analysis.html", &context).unwrap())
}

#[get("/")]
async fn hello() -> impl Responder {
    let context = Context::new();
    HttpResponse::Ok().body(TEMPLATES.render("hello.html", &context).unwrap())
}


async fn default_handler() -> impl Responder {
    HttpResponse::Ok().body("404. Not found")
}

struct MyWs;

impl Actor for MyWs {
    type Context = ws::WebsocketContext<Self>;
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWs {
    fn handle(&mut self, item: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        todo!()
    }
}


async fn ws_index(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let resp = ws::start(MyWs {}, &req, stream);
    println!("{:?}", resp);
    resp
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));


    HttpServer::new(|| {
        App::new()
        .wrap(middleware::Logger::default())
        .service(hello)
        .service(analysis)
        .service(Files::new("/assets", "public"))
        .route("/ws/", web::get().to(ws_index))
        .default_service(web::get().to(default_handler))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}