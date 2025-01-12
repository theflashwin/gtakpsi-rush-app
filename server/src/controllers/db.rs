use mongodb::{options::ClientOptions, Client, Collection};
use std::sync::Arc;
use tokio::sync::OnceCell;

use crate::models::{misc::RushNight, pis::{PISQuestion, PISTimeslot}, Rushee};

pub static MONGO_CLIENT: OnceCell<Arc<Client>> = OnceCell::const_new();

/// Initialize the MongoDB client
pub async fn initialize_mongo_client(uri: &str) -> Result<(), mongodb::error::Error> {
    let client_options = ClientOptions::parse(uri).await?;
    let client = Client::with_options(client_options)?;
    MONGO_CLIENT
        .set(Arc::new(client))
        .map_err(|_| mongodb::error::Error::from(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Failed to initialize MongoDB client",
        )))?;
    Ok(())
}

/// Get a reference to the MongoDB client
pub fn get_client() -> Arc<Client> {
    MONGO_CLIENT
        .get()
        .expect("MongoDB client is not initialized. Call `initialize_mongo_client` first.")
        .clone()
}

pub fn get_rushee_client() -> Collection<Rushee::RusheeModel> {
    get_client().database("rush-app").collection("rushees").clone()
}

pub fn get_pis_questions_client() -> Collection<PISQuestion> {
    get_client().database("rush-app").collection("pis-questions").clone()
}

pub fn get_pis_timeslots_client() -> Collection<PISTimeslot> {
    get_client().database("rush-app").collection("pis-timeslots").clone()
}

pub fn get_rush_nights_client() -> Collection<RushNight> {
    get_client().database("rush-app").collection("rush-nights").clone()
}