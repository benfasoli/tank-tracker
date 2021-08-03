import os
from datetime import datetime
from typing import Optional

import firebase_admin
import numpy as np
import pandas as pd
from firebase_admin import credentials, firestore
from pydantic import BaseModel


def snake_to_camel_case(snake_case: str) -> str:
    """Map snake_case string to camelCase."""
    words = snake_case.split("_")
    return words[0] + "".join(word.capitalize() for word in words[1:])


class TankRecord(BaseModel):
    updated_at: datetime
    serial: str
    fill_id: str
    user_id: str
    pressure: int
    location: Optional[str]
    owner: Optional[str]
    co2: Optional[float]
    co2_stdev: Optional[float]
    co2_sterr: Optional[float]
    co2_n: Optional[int]
    co2_relative_to: Optional[str]
    co2_calibration_file: Optional[str]
    co2_instrument_id: Optional[str]
    ch4: Optional[float]
    ch4_stdev: Optional[float]
    ch4_sterr: Optional[float]
    ch4_n: Optional[int]
    ch4_relative_to: Optional[str]
    ch4_calibration_file: Optional[str]
    ch4_instrument_id: Optional[str]
    co: Optional[float]
    co_stdev: Optional[float]
    co_sterr: Optional[float]
    co_n: Optional[int]
    co_relative_to: Optional[str]
    co_calibration_file: Optional[str]
    co_instrument_id: Optional[str]
    d13c: Optional[float]
    d13c_stdev: Optional[float]
    d13c_sterr: Optional[float]
    d13c_n: Optional[int]
    d13c_relative_to: Optional[str]
    d18o: Optional[float]
    d18o_stdev: Optional[float]
    d18o_sterr: Optional[float]
    d18o_n: Optional[int]
    d18o_relative_to: Optional[str]
    otto_calibration_file: Optional[str]
    comment: Optional[str]


# class TankStatus(BaseModel):
#     updated_at: datetime
#     fill_id: str
#     serial: str
#     tank_id: str
#     pressure: int
#     location: Optional[str]
#     owner: Optional[str]
#     co2: Optional[float]
#     ch4: Optional[float]
#     co: Optional[float]
#     d13c: Optional[float]
#     d18o: Optional[float]


df = pd.read_feather("../../shiny/tank_state.feather")
df = df.replace({np.nan: None})
df = df.sort_values(by="updated_at", ascending=False)

service_account_path = os.path.realpath(
    os.path.join(os.path.dirname(__file__), "..", "..", ".service-account.json")
)
cred = credentials.Certificate(
    service_account_path
    # "/Users/benfasoli/Desktop/tank-tracker-b67e2-firebase-adminsdk-2tsu2-76defd9b4f.json"
)
app = firebase_admin.initialize_app(cred)
db = firestore.client(app)

collection_ref = db.collection("tanks")


batch_length = 0
batch = db.batch()
created_tank_ids = {tank_id: False for tank_id in df.tank_id.unique()}

for index, row in df.iterrows():
    # status = TankStatus(**row)
    record = TankRecord(**row)

    # status_dict = status.dict()
    record_dict = record.dict()

    # status_dict_camel = dict(
    #     zip([snake_to_camel_case(k) for k in status_dict.keys()], status_dict.values())
    # )

    record_dict_camel = dict(
        zip([snake_to_camel_case(k) for k in record_dict.keys()], record_dict.values())
    )

    parent_doc_ref = collection_ref.document(row.tank_id)
    if not created_tank_ids[row.tank_id]:
        # parent_doc_ref.set(status_dict_camel)
        # batch.set(parent_doc_ref, status_dict_camel)
        batch.set(parent_doc_ref, record_dict_camel)
        batch_length += 1
        created_tank_ids[row.tank_id] = True

    # don't really have a good primary key for tank history, let firestore assign uuid
    doc_ref = parent_doc_ref.collection("history").document()
    # doc_ref.set(record_dict_camel)
    batch.set(doc_ref, record_dict_camel)
    batch_length += 1

    if batch_length > 450:
        batch.commit()
        batch = db.batch()