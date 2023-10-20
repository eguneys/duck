use actix_web::web::Data;

use crate::LocalAppState;
use super::{environment::Templates, analysis::AnalysisView, home::HomeView};

pub struct Views {
  pub analysis: AnalysisView,
  pub home: HomeView
}

impl Views {

  pub fn new(data: Data<LocalAppState>) -> Self {

    let templates = Templates::new(data);

    let home = HomeView::new(templates.clone());
    let analysis = AnalysisView::new(templates.clone());

    Views {
      home,
      analysis
    }
  }
}