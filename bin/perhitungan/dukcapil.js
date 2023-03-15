const $ = require('jquery')

function dukcapil(nik, callback) {
    var url = 'https://gis.dukcapil.kemendagri.go.id/arcgis/rest/services/Data_Baru_26092017/MapServer/3/query?f=json&where=1=1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=giskemendagri.gisadmin.Desa_Spasial_22092017.objectid ASC&resultOffset=125&resultRecordCount=25'

    $.get(url)
}


dukcapil()