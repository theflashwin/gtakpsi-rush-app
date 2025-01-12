use serde::{Deserialize, Serialize};
use bson::DateTime;

#[derive(Debug, Deserialize, Serialize)]
pub struct PISQuestion {
    pub question: String,
    pub question_type: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct PISTimeslot {
    pub time: DateTime,
    pub num_available: i32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct PISTimeslotIncoming {
    pub time: String,
    pub change: i32,
}