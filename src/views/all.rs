use actix_web::web::Data;

use crate::LocalAppState;
use super::{environment::Templates, analysis::AnalysisView};

pub struct Views {
  pub analysis: AnalysisView
}

impl Views {

  pub fn new(data: Data<LocalAppState>) -> Self {

    let templates = Templates::new(data);

    let analysis = AnalysisView::new(templates);
    Views {
      analysis
    }
  }
}