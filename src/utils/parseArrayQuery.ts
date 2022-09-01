export function categoriesToQuery(c: string[]) {
    let query = ""
    c.forEach(c => {
        query += `categories[]=${c}&`
    })
    return query
}

export function categoriesToSQL(c: string[]) {
    let query = "("
    c.forEach((c, i) => {
        if(i == 0) {
            query += c
        } else {
            query += `, ${c}`
        }
    })
    return query += ")"
}