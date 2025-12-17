// src/components/World/MilestoneMarker.tsx
import { Text } from '@react-three/drei';
import { TimelineNode } from '../../data/timelines';
import { getZFromYear } from '../../utils/dateUtils';
import { useGameStore } from '../../store';

export const MilestoneMarker = ({ node }: { node: TimelineNode }) => {
    const startYear = useGameStore(state => state.currentTimeline.startYear);
    const zPosition = getZFromYear(node.yearValue, startYear);
    const playerZ = -useGameStore(state => state.positionZ);

    // Simple Distance Culling: Don't render if > 200 units away
    if (Math.abs(zPosition - playerZ) > 200) return null;

    return (
        <group position={[3.5, 0, zPosition]}> {/* Đặt lệch sang phải 3.5 unit (bên lề đường) */}

            {/* 1. Phần thân cột mốc (Bê tông trắng) */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.6, 0.8, 0.6]} />
                <meshStandardMaterial color="#dddddd" roughness={0.9} />
            </mesh>

            {/* 2. Phần đỉnh cột mốc (Màu đỏ - Cảnh báo/Mốc) */}
            <mesh position={[0, 0.9, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} /> {/* Hình trụ tròn hoặc chóp */}
                <meshStandardMaterial color="#ff3333" />
            </mesh>

            {/* 3. Chữ hiển thị Năm (Dùng 3D Text để tối ưu hiệu năng) */}
            <Text
                position={[0, 0.5, 0.31]} // Nổi lên mặt trước cột một chút
                fontSize={0.25}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {node.year}
            </Text>

            {/* (Optional) Bóng đổ giả dưới chân nếu không bật shadow map xịn */}
            <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.5, 16]} />
                <meshBasicMaterial color="black" opacity={0.3} transparent />
            </mesh>
        </group>
    );
};