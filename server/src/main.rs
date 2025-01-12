use axum::extract::Query;
use axum::http::StatusCode;
use axum::{
    extract::Path,
    response::Json,
    routing::{get, post},
    Router,
};
use controllers::admin::add_pis_question;
use controllers::rushee;
use lambda_http::{run, Error};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::env::set_var;
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use axum::http::Method;
use dotenv::dotenv;
use std::env;

mod controllers;
mod models;
mod middlewares;

/// Example on how to return status codes and data from an Axum function
async fn health_check() -> (StatusCode, String) {
    let health = true;
    match health {
        true => (StatusCode::OK, "Healthy!".to_string()),
        false => (
            StatusCode::INTERNAL_SERVER_ERROR,
            "Not healthy!".to_string(),
        ), 
    }
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    // If you use API Gateway stages, the Rust Runtime will include the stage name
    // as part of the path that your application receives.
    // Setting the following environment variable, you can remove the stage from the path.
    // This variable only applies to API Gateway stages,
    // you can remove it if you don't use them.
    // i.e with: `GET /test-stage/todo/id/123` without: `GET /todo/id/123`
    set_var("AWS_LAMBDA_HTTP_IGNORE_STAGE_IN_PATH", "true");

    // required to enable CloudWatch error logging by the runtime 
    // tracing::init_default_subscriber();

    dotenv().ok();

    let mongo_uri = env::var("MONGO_URI").expect("MONGO URI Must be Set");

    controllers::db::initialize_mongo_client(&mongo_uri).await?;

    let app = Router::new()

        .route("/rushee/signup", post(controllers::rushee::signup))
        .route("/rushee/get-rushees", get(controllers::rushee::get_rushees))
        .route("/rushee/:id", get(controllers::rushee::get_rushee))
        .route("/rushee/post-comment/:id",post(controllers::rushee::post_comment))
        .route("/rushee/post-pis/:id", post(controllers::rushee::post_pis))
        .route("/rushee/update-attendance/:id",post(controllers::rushee::update_attendance))
        .route("/rushee/update-cloud/:id", post(controllers::rushee::update_cloud))
        .route("/rushee/update-rushee/:id", post(controllers::rushee::update_rushee))
        .route("/rushee/reschedule-pis/:id", post(controllers::rushee::reschedule_pis))
        .route("/rushee/edit-comment/:id", post(controllers::rushee::edit_comment))
        .route("/rushee/delete-comment/:id", post(controllers::rushee::delete_comment))

        .route("/admin/add_pis_question", post(controllers::admin::add_pis_question))
        .route("/admin/delete_pis_question", post(controllers::admin::delete_pis_question))
        .route("/admin/get_pis_questions", get(controllers::admin::get_pis_questions))
        .route("/admin/add_pis_timelsot", post(controllers::admin::add_pis_timeslot))
        .route("/admin/delete_pis_timeslot", post(controllers::admin::delete_pis_timeslot))
        .route("/admin/get_pis_timeslots", get(controllers::admin::get_pis_timeslots))
        .route("/admin/add-rush-night", post(controllers::admin::add_rush_night))
        .route("/admin/delete_rush_night", post(controllers::admin::delete_rush_night))
        
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
                .allow_headers(Any),
        );

    run(app).await

} 