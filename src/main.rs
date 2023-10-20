#![allow(unused)]
#![recursion_limit = "512"]
mod views;

use actix::{ StreamHandler, Actor, fut::{Ready, ok} };
use actix_files::Files;
use actix_web::{Responder, get, HttpResponse, web::{self, Data}, App, HttpServer, middleware, HttpRequest, Error, FromRequest};

use actix_web_actors::ws;
use serde::Serialize;
use views::{environment::Templates, all::Views};

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


impl FromRequest for Views {
    type Error = Error;

    type Future = Ready<Result<Self, Error>>;

    fn from_request(req: &HttpRequest, payload: &mut actix_web::dev::Payload) -> Self::Future {
        ok(Views::new(req.app_data::<Data<LocalAppState>>().unwrap().clone()))
    }
}


#[get("/analysis")]
async fn analysis(views: Views) -> impl Responder {

    HttpResponse::Ok().body(views.analysis.show().to_string())
}

#[get("/")]
async fn hello(views: Views) -> impl Responder {
    HttpResponse::Ok().body(views.home.show().to_string())
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

pub struct LocalAppState {
    app_name: String
}

impl LocalAppState {
    fn new() -> Self {
        LocalAppState {
            app_name: "hello".to_string()
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let state = web::Data::new(LocalAppState::new());

    HttpServer::new(move || {
        App::new()
        .app_data(state.clone())
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