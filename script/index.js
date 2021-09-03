function setColumns(c){
    columns = []
    c = c.columns
    c.forEach((column) => columns.push(
        {title: column, field: column}
    ))
    return columns
}

function setData(df){
    var data = []
    let col = df.columns
    let row = df.col_data
    for(let r = 0; r < row.length; r++){
        var obj =[]
        for(let c = 0; c < col.length; c++){
            obj.push({[col[c]]: row[c][r]})
        }
        data.push(obj)
    }
    var fixData = []
    data.forEach((array) => {
        var newObj = {}
        for (let i = 0; i < array.length; i++){
            for (let [key, value] of Object.entries(array[i])){
                newObj[key] = value
            }
        }
        fixData.push(newObj)
    })
    return fixData
}

function cleanTable(){
    newTable = new Tabulator('#main', {
        data: [],
        layout: 'fitDataFill',
        autoColumns: true
    })
    return newTable
}

function freezeColumns(setdataDF){
    setdataDF.forEach((array) => {
        array['frozen'] = true
    })
    return setdataDF
}


cleanTable()

var downloader = document.getElementById('tableDL')
downloader.addEventListener('click', () => {
    newTable.download('xlsx', 'mytester.xlsx')
})

var loader = document.getElementById('loader')
loader.addEventListener('click', () => {
    dfd.read_excel('mytester.xlsx')
        .then((s) => {
            s.to_json().then((data) => {
                newTable = new Tabulator('#main', {
                    data:JSON.parse(data),
                    autoColumns: true,
                    movableColumns: true,
                    selectable: true,
                    selectableRollingSelection: true,
                    pagination: 'local',
                    paginationSize: 15,
                })
            })
    })
})

var clear = document.getElementById('clear')
clear.addEventListener('click', () => {
    newTable = cleanTable()
    newTable.redraw()
})
