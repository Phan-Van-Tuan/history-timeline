// src/components/World/Player.tsx
import { useFrame, useThree } from '@react-three/fiber';
import { useGameStore } from '../../store';
import { Vector3 } from 'three';

export const Player = () => {
    const { camera } = useThree();
    const tick = useGameStore(state => state.actions.tick);

    useFrame((state, delta) => {
        tick(delta); // Cập nhật vị trí trong store (biến positionZ tăng dần)

        // Logic mới:
        // positionZ trong store là "quãng đường đã đi được".
        // Vì ta quy ước đi về phía -Z, nên toạ độ thực tế = -positionZ
        const actualZ = -useGameStore.getState().positionZ;

        // Camera đi theo sau người chơi
        // Vị trí camera: Cao 2m, lùi lại 10m so với vị trí thực (tức là +10 Z)
        const targetCamPos = new Vector3(0, 2, actualZ + 10);

        // Điểm nhìn: Nhìn về phía trước (xa hơn vị trí thực 20m)
        const targetLookAt = new Vector3(0, 1, actualZ - 20);

        camera.position.lerp(targetCamPos, 0.1);
        camera.lookAt(targetLookAt);
    });

    return null;
}