import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'

const Map = () => {
  return (
    <MapContainer center={[35.6809591, 139.7673068]} zoom={12} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
        attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
      />
      <MarkerClusterGroup>
        <Marker position={[35.7, 139.7]}>
          <Popup>popup</Popup>
        </Marker>
        <Marker position={[35.6, 139.6]} />
        <Marker position={[35.5, 139.5]} />
        <Marker position={[35.4, 139.4]} />
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default Map
