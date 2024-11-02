export const Card = () => {
    return `

    <div class="row justify-between container container-item">
        <div class="col justify-between">
            <p class="title">Title</p>
            <p class="description">Content</p>
        </div>
        <div class="col justify-between">
            <div class="row">
                <label>done</label>
                <input type="checkbox"></input>
            </div>
            <button id="delete" type="button">delete</button>
        </div>
    </div>
    `
}