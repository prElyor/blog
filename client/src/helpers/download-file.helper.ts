import axios from "axios";

export async function downloadFile ( url: string) {

    const response = await axios.get(url, {
        responseType: 'blob'
    })

    const urlBlob = window.URL
        .createObjectURL(new Blob([response.data]))

    const link = document.createElement('a')

    link.href = urlBlob

    link.setAttribute('download', `${url}`)
    document.body.appendChild(link)

    link.click()
    document.body.removeChild(link)
}

export const download64String = (href: string) => {
    const link = document.createElement('a')

    link.href = href

    link.setAttribute('download', `download`)
    document.body.appendChild(link)

    link.click()
    document.body.removeChild(link)
}