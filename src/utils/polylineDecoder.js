// Decode Google Maps encoded polyline format to lat/lng coordinates
export const decodePolyline = (encoded) => {
  if (!encoded) return [];
  
  const inv = 1.0 / 1e5;
  const decoded = [];
  let previous = [0, 0];
  
  for (let i = 0, ll = encoded.length; i < ll; i++) {
    let ll2 = encoded.charCodeAt(i) - 63;
    ll2 |= (encoded.charCodeAt(++i) - 63) << 5;
    ll2 = ((ll2 & 1) ? ~(ll2 >> 1) : (ll2 >> 1));
    previous[0] += ll2;
    ll2 = encoded.charCodeAt(++i) - 63;
    ll2 |= (encoded.charCodeAt(++i) - 63) << 5;
    ll2 = ((ll2 & 1) ? ~(ll2 >> 1) : (ll2 >> 1));
    previous[1] += ll2;
    
    // Return [lat, lng] format for Leaflet
    decoded.push([previous[0] * inv, previous[1] * inv]);
  }
  
  return decoded;
};
