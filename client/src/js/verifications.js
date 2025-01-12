import axios from "axios"

export async function verifyUser() {

    let x = false

    if (localStorage.getItem('token') != null) {

        const api = import.meta.env.VITE_LOGIN_API_PREFIX;

        await axios.get(`${api}/users/verifytoken`, {
            headers: {
                'token': JSON.parse(localStorage.getItem('token'))
            }
        })
            .then((response) => {
                if (response.data === "success") {
                    x = true
                } else {
                    x = false
                }
            })
            .catch((error) => {
                x = false
            })

    } else {
        x = false
    }

    Promise.resolve(x)
    return x

}

export function verifyGTID(gtid) {

    // check length
    if (gtid.length != 9) {
        return false;
    }

    // verify its all numbers
    if (!/^[0-9]+$/.test(gtid)) {
        return false
    }

    return true;

}