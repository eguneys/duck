use actix_web::{Responder, get, HttpResponse, web, App, HttpServer};


#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello guys!")
}


async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
        .service(hello)
        .route("/hey", web::get().to(manual_hello))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}