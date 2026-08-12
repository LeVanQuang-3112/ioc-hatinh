import { useEffect, useRef } from "react";
import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Minus, Plus } from "lucide-react";
import {
  haTinhAdministrativeUnits,
  haTinhMapPoints,
} from "../../model/administrativeUnits";
import { haTinhGeoJson } from "../../model/dashboardContent";

function getShortAdministrativeName(name: string) {
  return name.replace(/^(Xã|Phường)\s+/, "");
}

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

    const administrativeBoundaryLayer = L.geoJSON(haTinhGeoJson as unknown as GeoJsonObject, {
      style: (feature) => {
        const isWard = String(feature?.properties?.fullName ?? "").startsWith("Phường ");
        return {
          color: isWard ? "#ffd34f" : "rgba(185, 242, 218, 0.9)",
          fillColor: isWard ? "#d69d26" : "#1f7a58",
          fillOpacity: isWard ? 0.2 : 0.12,
          opacity: 0.92,
          weight: isWard ? 1.5 : 1,
        };
      },
      onEachFeature: (feature, layer) => {
        const fullName = String(feature.properties?.fullName ?? feature.properties?.name ?? "");
        const shortName = getShortAdministrativeName(fullName);
        const code = String(feature.properties?.code ?? feature.id ?? "");
        const area = Number(feature.properties?.areaKm2);
        const areaText = Number.isFinite(area) ? `<br>Diện tích: ${area.toLocaleString("vi-VN")} km²` : "";
        const isWard = fullName.startsWith("Phường ");

        layer.bindTooltip(shortName, {
          className: isWard ? "ha-tinh-boundary-label ward" : "ha-tinh-boundary-label",
          direction: "center",
          opacity: 1,
          permanent: true,
        });
        layer.bindPopup(`<strong>${fullName}</strong><br>Mã: ${code}${areaText}`, {
          className: "ha-tinh-boundary-popup",
        });
      },
    }).addTo(map);

    const pointLayer = L.layerGroup().addTo(map);

    haTinhMapPoints.forEach((point) => {
      const [lng, lat, metric] = point.value;
      const isCapital = point.wardCode === "18073";
      const tone = metric >= 3000 ? "#ffbc4e" : metric >= 2000 ? "#f1ec72" : metric >= 1000 ? "#51e572" : "#5ba9ff";

      L.circleMarker([lat, lng], {
        className: "ha-tinh-map-point",
        color: "rgba(255, 255, 255, 0.95)",
        fillColor: tone,
        fillOpacity: 0.86,
        opacity: 1,
        radius: isCapital ? 6.5 : 4.4,
        weight: 1.8,
      }).addTo(pointLayer);
    });

    const bounds = administrativeBoundaryLayer.getBounds();
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
        <div className="administrative-unit-summary">
          <strong>{haTinhAdministrativeUnits.length}</strong>
          <span>đơn vị cấp xã</span>
        </div>
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
