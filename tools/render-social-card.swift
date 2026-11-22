// Optional macOS authoring tool. The generated PNG is committed; CI needs only Node.js.
// Run from the repository root: swift tools/render-social-card.swift
import AppKit
import Foundation

let width = 1200, height = 630
let colorSpace = CGColorSpaceCreateDeviceRGB()
let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8,
                        bytesPerRow: width * 4, space: colorSpace,
                        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
context.translateBy(x: 0, y: CGFloat(height))
context.scaleBy(x: 1, y: -1)
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(cgContext: context, flipped: true)

func color(_ hex: UInt32) -> NSColor {
    NSColor(srgbRed: CGFloat((hex >> 16) & 255) / 255,
            green: CGFloat((hex >> 8) & 255) / 255,
            blue: CGFloat(hex & 255) / 255, alpha: 1)
}
func fill(_ rect: CGRect, _ hex: UInt32, radius: CGFloat = 0) {
    context.setFillColor(color(hex).cgColor)
    context.addPath(CGPath(roundedRect: rect, cornerWidth: radius, cornerHeight: radius, transform: nil))
    context.fillPath()
}
func text(_ value: String, _ x: CGFloat, _ y: CGFloat, _ size: CGFloat,
          _ hex: UInt32, serif: Bool = false, tracking: CGFloat = 0) {
    let font = NSFont(name: serif ? "Songti TC" : "PingFang TC", size: size) ?? NSFont.systemFont(ofSize: size)
    (value as NSString).draw(at: NSPoint(x: x, y: y), withAttributes: [
        .font: font, .foregroundColor: color(hex), .kern: tracking
    ])
}

fill(CGRect(x: 0, y: 0, width: width, height: height), 0xf7f5ed)
fill(CGRect(x: 0, y: 0, width: width, height: 12), 0x224d40)
text("HISTORICAL ATLAS", 72, 76, 17, 0x806a43, tracking: 4)
text("時序地圖集", 65, 132, 76, 0x224d40, serif: true)
text("把歷史，放回地圖與時間軸。", 72, 254, 29, 0x224d40)
text("逐步推進事件，觀察國家立場與歷史因果。", 72, 320, 21, 0x536155)
text("繁體中文解說・互動地圖・史料來源", 72, 360, 21, 0x536155)

let panel = CGRect(x: 760, y: 66, width: 368, height: 422)
context.saveGState()
context.addPath(CGPath(roundedRect: panel, cornerWidth: 16, cornerHeight: 16, transform: nil))
context.clip()
fill(panel, 0xd6e3dc)
func project(_ longitude: Double, _ latitude: Double) -> CGPoint {
    CGPoint(x: panel.minX + (longitude + 15) / 58 * panel.width,
            y: panel.maxY - (latitude - 33) / 29 * panel.height)
}
// Natural Earth public-domain land from the same source as the interactive map.
let data = try Data(contentsOf: URL(fileURLWithPath: "app/land.json"))
let collection = try JSONSerialization.jsonObject(with: data) as! [String: Any]
for feature in collection["features"] as! [[String: Any]] {
    let geometry = feature["geometry"] as! [String: Any]
    let polygons: [[[[Double]]]]
    if geometry["type"] as? String == "Polygon" {
        polygons = [geometry["coordinates"] as! [[[Double]]]]
    } else {
        polygons = geometry["coordinates"] as! [[[[Double]]]]
    }
    for polygon in polygons {
        let path = CGMutablePath()
        for ring in polygon where !ring.isEmpty {
            path.move(to: project(ring[0][0], ring[0][1]))
            for point in ring.dropFirst() { path.addLine(to: project(point[0], point[1])) }
            path.closeSubpath()
        }
        context.addPath(path)
        context.setFillColor(color(0xb8c7ac).cgColor)
        context.drawPath(using: .eoFill)
        context.addPath(path)
        context.setStrokeColor(color(0xf7f5ed).cgColor)
        context.setLineWidth(1.3)
        context.strokePath()
    }
}
context.restoreGState()

for (name, longitude, latitude, offset) in [
    ("柏林", 13.405, 52.52, -45.0), ("塞拉耶佛", 18.4131, 43.8563, 17.0)
] {
    let p = project(longitude, latitude)
    fill(CGRect(x: p.x - 9, y: p.y - 9, width: 18, height: 18), 0xf7f5ed, radius: 9)
    fill(CGRect(x: p.x - 5, y: p.y - 5, width: 10, height: 10), 0xa14e38, radius: 5)
    text(name, p.x - 34, p.y + offset, 18, 0x224d40)
}
text("事件地點示意・自然陸地輪廓", 784, 450, 13, 0x536155)

fill(CGRect(x: 72, y: 432, width: 280, height: 56), 0x224d40, radius: 6)
text("第一次世界大戰", 94, 444, 22, 0xfffdf4)
fill(CGRect(x: 370, y: 432, width: 280, height: 56), 0xe5e8db, radius: 6)
text("從柏林圍牆到德國統一", 389, 447, 18, 0x224d40)
fill(CGRect(x: 72, y: 535, width: 1056, height: 1), 0xb7beac)
text("grapycalpis.github.io/historical-atlas", 72, 560, 18, 0x536155)
text("Land: Natural Earth · Public domain", 867, 594, 11, 0x67746b)

let image = context.makeImage()!
NSGraphicsContext.restoreGraphicsState()
let bitmap = NSBitmapImageRep(cgImage: image)
let png = bitmap.representation(using: .png, properties: [:])!
try png.write(to: URL(fileURLWithPath: "app/social-card.png"))
print("Wrote app/social-card.png (1200 × 630)")
