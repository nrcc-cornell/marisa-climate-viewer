'''Reformat county geojson.

	Reformat county geojson from ACIS into a geojson used in this tool by leaflet.

'''
import sys
import json
import polyRoutines as poly

# geojson containing counties within watershed bounding box
ifile = open('chesapeake_bay_watershed_county_acis_with_fips.geojson','r')
features = json.load(ifile)
ifile.close()

# get chesapeake bay watershed polygon info
polyInfo = poly.getInfoFromShp('chesapeake_bay_watershed_geo_coords.shp')
numPolygonsInWatershed = len(polyInfo)

featureList = []
for feature in features["meta"]:
	if 'geojson' not in feature: continue
	numPolygonsInThisCounty = len(feature['geojson']['coordinates'])
	for inum in range(numPolygonsInThisCounty):
		#countyCoordList = feature['geojson']['coordinates'][0][inum]
		countyCoordList = feature['geojson']['coordinates'][inum][0]
		for lon,lat in countyCoordList:
			for ipoly in range(numPolygonsInWatershed):
				polyToTest = polyInfo[ipoly]['POINTS']
				countyInPolygon = poly.pointInPolygon(lon,lat,polyToTest)
				if countyInPolygon: break
			if countyInPolygon: break
	if not countyInPolygon:
		# test if any polygon border points are in this county
		for ipoly in range(numPolygonsInWatershed):
			polyToTest = polyInfo[ipoly]['POINTS']
			for lon,lat in polyToTest:
				for inum in range(numPolygonsInThisCounty):
					#countyCoordList = feature['geojson']['coordinates'][0][inum]
					countyCoordList = feature['geojson']['coordinates'][inum][0]
					polygonInCounty = poly.pointInPolygon(lon,lat,countyCoordList)
					if polygonInCounty: break
				if polygonInCounty: break
			if polygonInCounty: break
		if not polygonInCounty: continue
	if countyInPolygon or polygonInCounty:
		featureOut = {}
		featureOut["geometry"] = feature["geojson"]
		featureOut["type"] = "Feature"
		featureOut["properties"] = {"id":feature["id"],"state":feature["state"],"name":feature["name"].replace(' County','')}
		featureList.append(featureOut)

jsonOut = {}
jsonOut["type"] = "FeatureCollection"
jsonOut["features"] = featureList

#ofile = open('ny_county.geojson','w')
ofile = open('chesapeake_bay_watershed_county_with_fips.geojson','w')
json.dump(jsonOut,ofile)
ofile.close()
