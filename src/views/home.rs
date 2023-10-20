use html::root::Html;

use super::{environment::Templates, base::layout};

pub struct HomeView {
  templ: Templates
}


impl HomeView {

  pub fn new(templ: Templates) -> Self {
    HomeView { templ }
  }

  pub fn show(&self) -> Html {
    layout(|main| {
      main
      .section(|section| {
        section.division(|div| {
          div.class("feednews")
          .division(|div| {
            div.class("feed")
            .paragraph(|p| {
              p.text("Hello heroku, You've analysed 2 games today, 32 this week.")
            })
            .paragraph(|p| {
              p.text("duckchess.org has analysed 200 games today, 1000 this week.")
            })
            .paragraph(|p| {
              p.text("Currently 2 people are on the site.")
            })
          }) // feed
          .division(|div| {
            div.class("news")
            .unordered_list(|ul| {
              ul
              .list_item(|li| 
                li.text("duckchess.org has launched")
                .span(|span| span.class("date").text("28 February")))
              .list_item(|li| li.text("March site update")
                .span(|span| span.class("date").text("28 March")))
            })
          })
        })
      })
      .section(|section| {
        section
        .division(|div| {
          div.class("seekactionfooter")
          .footer(|footer| {
            footer
            .anchor(|a| a.text("Donate"))
            .anchor(|a| a.text("About"))
          })
          .division(|div| {
            div.class("lobby-app")
            .division(|div| {
              div.class("action")
            })
            .division(|div| {
              div.class("hookoptions")
              .division(|div| {
                div.class("hooks")
                .unordered_list(|ul| {
                  ul
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("heroku vs 3+2 Duck Chess"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                  .list_item(|li| li.text("Anonymous vs 3+2 Duck Chess Fischer Random"))
                })
              })
              .division(|div| {
                div.class("options")
                .select(|select| {
                  select
                  .option(|option| option.text("3+2"))
                  .option(|option| option.text("5+4"))
                  .option(|option| option.text("10"))
                  .option(|option| option.text("7+5"))
                })
                .label(|label| {
                  label.class("switch")
                  .input(|input| {
                    input.type_("checkbox")
                  })
                  .span(|span| {
                    span.class("slider")})
                  .span(|span| {
                    span.class("left").text("Regular")})
                  .span(|span| {
                    span.class("right").text("Fischer Random")})
                })
                .button(|button| button.text("Seek"))
              })
            })
          })
          .division(|div| {
            div.class("puzzle-wrap")
            .text("Duck Puzzle")
            .text("White to move")
          })
        })
      })

    },self.templ.hfrag(vec![
      self.templ.css_tag("lobby".to_string())
    ]), 
    self.templ.js_module_init("lobby".to_string(), "hello".to_string()))
  }

}