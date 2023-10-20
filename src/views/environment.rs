use actix_web::web::Data;

use crate::LocalAppState;


pub struct NetConfig {
  dev: bool
}

impl NetConfig {
  fn minified_assets(&self) -> bool {
    return !self.dev
  }
}


pub struct Env {
  net: NetConfig
}

#[derive(Clone)]
pub struct Templates(Data<LocalAppState>);

impl Templates {
  pub fn new(data: Data<LocalAppState>) -> Self {
    Templates(data)
  }
}