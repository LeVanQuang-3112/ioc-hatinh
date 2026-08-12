import { useEffect, useRef } from "react";
import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Minus, Plus } from "lucide-react";
import { haTinhGeoJson, haTinhMapPoints } from "../../model/dashboardContent";

export function MapCanvas({ className = "", title }: { className?: string; title: string }) {
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapNodeRef.current || leafletMapRef.current) {
      return undefined;
    }

    const map = L.map(mapNodeRef.current, {
      attributionControl: false,
      doubleClickZoom: true,
      maxZoom: 14,
      minZoom: 8,
      preferCanvas: true,
      scrollWheelZoom: false,
      zoomSnap: 0.1,
      zoomControl: false,
    });

    leafletMapRef.current = map;

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18,
    }).addTo(map);

    L.geoJSON(haTinhGeoJson as unknown as GeoJsonObject, {
      style: {
        color: "#ffd34f",
        dashArray: "8 6",
        fillColor: "#1f7a58",
        fillOpacity: 0.12,
        opacity: 0.96,
        weight: 2.4,
      },
    }).addTo(map);

    const pointLayer = L.layerGroup().addTo(map);

    haTinhMapPoints.forEach((point) => {
      const [lng, lat, metric] = point.value;
      const isCapital = point.name.includes("TP.");
      const tone = metric >= 3000 ? "#ffbc4e" : metric >= 2000 ? "#f1ec72" : metric >= 1000 ? "#51e572" : "#5ba9ff";

      L.circleMarker([lat, lng], {
        className: "ha-tinh-map-point",
        color: "rgba(255, 255, 255, 0.95)",
        fillColor: tone,
        fillOpacity: 0.86,
        opacity: 1,
        radius: isCapital ? 6.5 : 4.4,
        weight: 1.8,
      })
        .bindTooltip(point.name, {
          className: isCapital ? "ha-tinh-place-label capital" : "ha-tinh-place-label",
          direction: "top",
          offset: [0, -4],
          opacity: 1,
          permanent: true,
        })
        .addTo(pointLayer);
    });

    const bounds = L.geoJSON(haTinhGeoJson as unknown as GeoJsonObject).getBounds();
    map.fitBounds(bounds, { padding: [22, 22] });
    map.setZoom(Math.min(11.2, map.getZoom() + 0.25));
    map.setMaxBounds(bounds.pad(0.72));

    const resizeFrame = requestAnimationFrame(() => map.invalidateSize());

    return () => {
      cancelAnimationFrame(resizeFrame);
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  const zoomIn = () => leafletMapRef.current?.zoomIn();
  const zoomOut = () => leafletMapRef.current?.zoomOut();

  return (
    <article className={`map-panel ${className}`}>
      <div className="panel-title green">
        <span className="pin-icon" aria-hidden="true" />
        {title}
      </div>
      <div className="map-canvas" role="img" aria-label="Bản đồ tỉnh Hà Tĩnh">
        <div ref={mapNodeRef} className="ha-tinh-leaflet-map" />
        <div className="map-legend">
          <span className="legend high">Trên 3.000</span>
          <span className="legend mid">2.000 - 3.000</span>
          <span className="legend low">1.000 - 2.000</span>
          <span className="legend base">Dưới 1.000</span>
        </div>
        <div className="zoom-control">
          <button type="button" onClick={zoomIn} aria-label="Phóng to bản đồ">
            <Plus aria-hidden="true" />
          </button>
          <button type="button" onClick={zoomOut} aria-label="Thu nhỏ bản đồ">
            <Minus aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
