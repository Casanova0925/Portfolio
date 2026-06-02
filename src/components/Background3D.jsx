import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// ── Moving coloured point lights ──
function DynamicLights() {
  const l1 = useRef(), l2 = useRef(), l3 = useRef();
  useFrame(({ clock: { elapsedTime: t } }) => {
    if (l1.current) { l1.current.position.x = Math.sin(t * 0.6) * 9; l1.current.position.z = Math.cos(t * 0.6) * 9; }
    if (l2.current) { l2.current.position.x = Math.cos(t * 0.4) * 11; l2.current.position.y = Math.sin(t * 0.5) * 6; }
    if (l3.current) { l3.current.position.z = Math.sin(t * 0.3) * 12; l3.current.position.y = Math.cos(t * 0.7) * 5; }
  });
  return (
    <>
      <pointLight ref={l1} color="#00F2FF" intensity={4} distance={30} />
      <pointLight ref={l2} color="#a78bfa" intensity={3} distance={25} />
      <pointLight ref={l3} color="#34d399" intensity={2} distance={20} />
    </>
  );
}

// ── HOME – Morphing icosahedron + 800-particle galaxy + 5 rings ──
function HomeScene() {
  const coreRef = useRef();
  const pointsRef = useRef();
  const rings = useRef([]);
  const origPos = useRef(null);
  const COUNT = 800;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4.5 + Math.random() * 4;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      arr[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useEffect(() => {
    if (coreRef.current)
      origPos.current = new Float32Array(coreRef.current.geometry.attributes.position.array);
  }, []);

  useFrame(({ clock: { elapsedTime: t } }) => {
    // Vertex morphing
    if (coreRef.current && origPos.current) {
      const pos = coreRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = origPos.current[i*3], oy = origPos.current[i*3+1], oz = origPos.current[i*3+2];
        const n = Math.sin(ox*2+t) * Math.cos(oy*2+t*0.7) * Math.sin(oz+t*1.3) * 0.25;
        pos.setXYZ(i, ox+ox*n, oy+oy*n, oz+oz*n);
      }
      pos.needsUpdate = true;
      coreRef.current.geometry.computeVertexNormals();
      coreRef.current.material.emissiveIntensity = 0.5 + Math.sin(t*2) * 0.25;
    }
    if (pointsRef.current) { pointsRef.current.rotation.y = t*0.04; pointsRef.current.rotation.x = t*0.015; }
    rings.current.forEach((r, i) => { if (r) { r.rotation.z = t*(0.25+i*0.12); r.rotation.y = t*(0.08+i*0.07); } });
  });

  const ringCfg = [
    { r:3.4, tube:0.03, col:'#00F2FF', op:0.9, rot:[0,0,0] },
    { r:4.6, tube:0.02, col:'#a78bfa', op:0.55, rot:[Math.PI/3,0,0] },
    { r:5.5, tube:0.015, col:'#ffffff', op:0.2, rot:[Math.PI/5,Math.PI/4,0] },
    { r:2.7, tube:0.035, col:'#00F2FF', op:0.35, rot:[-Math.PI/4,0,Math.PI/6] },
    { r:6.3, tube:0.01, col:'#34d399', op:0.15, rot:[Math.PI/2,Math.PI/5,0] },
  ];

  return (
    <group position={[3,0,0]}>
      <Float speed={0.7} floatIntensity={0.5}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[2,8]} />
          <meshPhysicalMaterial color="#050a14" emissive="#00F2FF" emissiveIntensity={0.5} roughness={0.05} metalness={1} clearcoat={1} />
        </mesh>
        <mesh><sphereGeometry args={[1.1,32,32]} /><meshPhysicalMaterial color="#00F2FF" emissive="#00F2FF" emissiveIntensity={3} transparent opacity={0.1} /></mesh>
      </Float>
      {ringCfg.map((c,i) => (
        <mesh key={i} ref={el => rings.current[i]=el} rotation={c.rot}>
          <torusGeometry args={[c.r, c.tube, 8, 200]} />
          <meshStandardMaterial color={c.col} emissive={c.col} emissiveIntensity={1.2} transparent opacity={c.op} />
        </mesh>
      ))}
      <points ref={pointsRef}>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} /></bufferGeometry>
        <pointsMaterial size={0.055} color="#00F2FF" transparent opacity={0.65} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  );
}

// ── HEALTHCARE – DNA Double Helix (blended with existing UI palette) ──
function DNAScene() {
  const groupRef  = useRef();
  const partRef   = useRef();

  // Build both helix curves + rung data
  const { tube1, tube2, curve1, curve2, rungMeshData } = useMemo(() => {
    const p1 = [], p2 = [];
    for (let i = 0; i <= STRAND; i++) {
      const angle = (i / STRAND) * Math.PI * 2 * TURNS;
      const y     = (i / STRAND) * HEIGHT - HEIGHT / 2;
      p1.push(new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS));
      p2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS));
    }
    const c1 = new THREE.CatmullRomCurve3(p1);
    const c2 = new THREE.CatmullRomCurve3(p2);

    // Rungs every ~3 steps
    const rungs = [];
    for (let i = 0; i <= STRAND; i += 3) {
      const t  = i / STRAND;
      const a  = c1.getPoint(t);
      const b  = c2.getPoint(t);
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
      const len = a.distanceTo(b);
      const dir = new THREE.Vector3().subVectors(b, a).normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      rungs.push({ mid, len, quat });
    }

    return {
      tube1: new THREE.TubeGeometry(c1, 200, 0.1, 8, false),
      tube2: new THREE.TubeGeometry(c2, 200, 0.1, 8, false),
      curve1: c1, curve2: c2, rungMeshData: rungs,
    };
  }, []);

  // Particle state: flowing up both strands
  const pData = useMemo(() => ({
    pos:    new Float32Array(PART * 3),
    prog:   new Float32Array(PART).map(() => Math.random()),
    spd:    new Float32Array(PART).map(() => 0.06 + Math.random() * 0.14),
    strand: new Float32Array(PART).map(() => Math.random() > 0.5 ? 0 : 1),
  }), []);

  useFrame(({ clock: { elapsedTime: t } }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
    }
    if (partRef.current) {
      for (let i = 0; i < PART; i++) {
        pData.prog[i] = (pData.prog[i] + pData.spd[i] * 0.003) % 1;
        const p = (pData.strand[i] === 0 ? curve1 : curve2).getPoint(pData.prog[i]);
        pData.pos[i * 3]     = p.x;
        pData.pos[i * 3 + 1] = p.y;
        pData.pos[i * 3 + 2] = p.z;
      }
      partRef.current.geometry.attributes.position.array = pData.pos;
      partRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Float speed={0.5} floatIntensity={0.4}>
      <group ref={groupRef} position={[4, 0, 0]}>

        {/* Strand 1 – cyan */}
        <mesh geometry={tube1}>
          <meshPhysicalMaterial color="#00aaff" emissive="#00F2FF" emissiveIntensity={1.1}
            roughness={0.05} metalness={0.7} clearcoat={1}/>
        </mesh>

        {/* Strand 2 – violet */}
        <mesh geometry={tube2}>
          <meshPhysicalMaterial color="#7c3aed" emissive="#a78bfa" emissiveIntensity={1.1}
            roughness={0.05} metalness={0.7} clearcoat={1}/>
        </mesh>

        {/* Connecting rungs */}
        {rungMeshData.map((r, i) => (
          <mesh key={i} position={r.mid} quaternion={r.quat}>
            <cylinderGeometry args={[0.05, 0.05, r.len, 6]}/>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff"
              emissiveIntensity={0.5} transparent opacity={0.5}/>
          </mesh>
        ))}

        {/* Base-pair glow spheres at every other rung */}
        {rungMeshData.filter((_, i) => i % 2 === 0).map((r, i) => (
          <mesh key={`bp-${i}`} position={r.mid}>
            <sphereGeometry args={[0.12, 10, 10]}/>
            <meshStandardMaterial color={i % 2 === 0 ? '#00F2FF' : '#a78bfa'}
              emissive={i % 2 === 0 ? '#00F2FF' : '#a78bfa'} emissiveIntensity={2}/>
          </mesh>
        ))}

        {/* Flowing particles */}
        <points ref={partRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={PART} array={pData.pos} itemSize={3}/>
          </bufferGeometry>
          <pointsMaterial size={0.14} color="#ffffff" transparent opacity={0.9}
            blending={THREE.AdditiveBlending} sizeAttenuation/>
        </points>


      </group>
    </Float>
  );
}


function BuildingScene() {
  const scanRef = useRef();
  const cityRef = useRef();
  const bldRefs = useRef([]);

  const buildings = useMemo(() => [
    {x:0,   z:0,   w:1.1, d:1.1, h:6.5},
    {x:2.3, z:0.5, w:0.9, d:0.9, h:4.2},
    {x:-2,  z:-0.5,w:1.2, d:0.8, h:5.3},
    {x:1.6, z:-2,  w:0.6, d:0.7, h:7.5},
    {x:-1.5,z:2,   w:1,   d:1,   h:3.5},
    {x:3.1, z:-1,  w:0.5, d:0.6, h:5.8},
    {x:-3,  z:1,   w:0.8, d:0.9, h:4.6},
    {x:0.8, z:2.5, w:0.5, d:0.5, h:6},
  ], []);

  useEffect(() => {
    bldRefs.current.forEach((b, i) => {
      if (!b) return;
      const ty = b.userData.ty;
      b.position.y = ty - 12;
      gsap.to(b.position, { y: ty, duration: 1.4, delay: i*0.1, ease:'power3.out' });
    });
  }, []);

  useFrame(({ clock: { elapsedTime: t } }) => {
    if (cityRef.current) cityRef.current.rotation.y = t*0.12;
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(t*0.7)*3.5;
      scanRef.current.material.opacity = 0.04 + Math.abs(Math.sin(t*0.7))*0.09;
    }
  });

  return (
    <group ref={cityRef} position={[4,-1,0]}>
      {buildings.map((b,i) => {
        const ty = b.h/2 - 4.5;
        return (
          <group key={i} ref={el=>{if(el){el.userData.ty=ty; bldRefs.current[i]=el;}}} position={[b.x, ty, b.z]}>
            <mesh><boxGeometry args={[b.w,b.h,b.d]}/><meshPhysicalMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.12} transparent opacity={0.07} roughness={0} metalness={1}/></mesh>
            <mesh><boxGeometry args={[b.w,b.h,b.d]}/><meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1} wireframe/></mesh>
            <mesh position={[0,b.h/2+0.05,0]}><sphereGeometry args={[0.07,8,8]}/><meshStandardMaterial color="#00F2FF" emissive="#00F2FF" emissiveIntensity={3}/></mesh>
          </group>
        );
      })}
      <gridHelper args={[16,24,'#a78bfa','#5b21b6']} position={[0,-4.5,0]}/>
      <mesh ref={scanRef} rotation={[Math.PI/2,0,0]}>
        <planeGeometry args={[16,16]}/>
        <meshStandardMaterial color="#00F2FF" emissive="#00F2FF" emissiveIntensity={1} transparent opacity={0.07} side={THREE.DoubleSide}/>
      </mesh>
    </group>
  );
}

// ── EDTECH – Multi-layer Neural Network with firing signal pulses ──
function NeuralNetScene() {
  const groupRef = useRef();
  const nodeMatRefs = useRef([]);
  const pulseRefs = useRef([]);

  // Build 4-layer network [3,5,5,3]
  const { nodes, connections } = useMemo(() => {
    const cfg=[3,5,5,3]; const nodes=[]; const connections=[];
    cfg.forEach((cnt,li)=>{
      const x=(li-(cfg.length-1)/2)*3;
      for(let ni=0;ni<cnt;ni++){
        const y=(ni-(cnt-1)/2)*1.5;
        nodes.push({pos:new THREE.Vector3(x,y,0),li,ni,idx:nodes.length});
      }
    });
    let off=0;
    for(let li=0;li<cfg.length-1;li++){
      const A=nodes.slice(off,off+cfg[li]), B=nodes.slice(off+cfg[li],off+cfg[li]+cfg[li+1]);
      A.forEach(a=>B.forEach(b=>connections.push({from:a.pos,to:b.pos,fromIdx:a.idx,toIdx:b.idx})));
      off+=cfg[li];
    }
    return {nodes,connections};
  },[]);

  // 20 signal pulses
  const PULSES=20;
  const pulseData = useMemo(()=>Array.from({length:PULSES},(_,i)=>({
    connIdx:i%connections.length, prog:Math.random(), spd:0.006+Math.random()*0.01
  })),[connections]);

  const edgeGeos = useMemo(()=>connections.map(c=>{
    const g=new THREE.BufferGeometry().setFromPoints([c.from,c.to]); return g;
  }),[connections]);

  useFrame(({clock:{elapsedTime:t}})=>{
    if(groupRef.current){groupRef.current.rotation.y=t*0.08;groupRef.current.rotation.x=Math.sin(t*0.15)*0.15;}
    nodeMatRefs.current.forEach((m,i)=>{ if(m) m.emissiveIntensity=0.5+Math.sin(t*2+i*0.9)*0.5; });
    pulseRefs.current.forEach((p,i)=>{
      if(!p) return;
      const d=pulseData[i]; d.prog=(d.prog+d.spd)%1;
      const c=connections[d.connIdx];
      p.position.lerpVectors(c.from,c.to,d.prog);
    });
  });

  const nodeColors=['#00F2FF','#a78bfa','#34d399','#f59e0b'];
  return (
    <Float speed={0.6} floatIntensity={0.3}>
      <group ref={groupRef} position={[4,0,0]}>
        {nodes.map((n,i)=>(
          <mesh key={i} position={n.pos}>
            <sphereGeometry args={[0.22,24,24]}/>
            <meshPhysicalMaterial ref={el=>nodeMatRefs.current[i]=el}
              color={nodeColors[n.li]} emissive={nodeColors[n.li]} emissiveIntensity={0.6}
              roughness={0.05} metalness={0.8} clearcoat={1}/>
          </mesh>
        ))}
        {edgeGeos.map((g,i)=>(
          <line key={i}><bufferGeometry attach="geometry" {...g}/>
            <lineBasicMaterial attach="material" color="#ffffff" transparent opacity={0.07}/></line>
        ))}
        {Array.from({length:PULSES}).map((_,i)=>(
          <mesh key={i} ref={el=>pulseRefs.current[i]=el}>
            <sphereGeometry args={[0.09,10,10]}/>
            <meshStandardMaterial color="#00F2FF" emissive="#00F2FF" emissiveIntensity={3}/>
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ── LEGALTECH – Hexagonal Data City: towers + circuit traces + flying packets ──
function DataCityScene() {
  const cityRef = useRef();
  const packetRefs = useRef([]);
  const scanRef = useRef();
  const TOWERS=8; const PACKETS=16;

  // Tower positions on a circle
  const towers = useMemo(()=>Array.from({length:TOWERS},(_,i)=>({
    angle:(i/TOWERS)*Math.PI*2,
    r:3.8, h:1.5+Math.random()*3.5,
    color:['#34d399','#34d399','#eab308','#34d399','#ef4444','#34d399','#34d399','#eab308'][i]
  })),[]);

  // Arc bridges between towers (TubeGeometry)
  const bridges = useMemo(()=>{
    const br=[];
    for(let i=0;i<TOWERS;i++){
      const a=towers[i], b=towers[(i+2)%TOWERS];
      const pa=new THREE.Vector3(Math.cos(a.angle)*a.r,a.h*0.6,Math.sin(a.angle)*a.r);
      const pb=new THREE.Vector3(Math.cos(b.angle)*b.r,b.h*0.6,Math.sin(b.angle)*b.r);
      const mid=new THREE.Vector3().addVectors(pa,pb).multiplyScalar(0.5).add(new THREE.Vector3(0,1.5,0));
      const curve=new THREE.CatmullRomCurve3([pa,mid,pb]);
      br.push({curve,geo:new THREE.TubeGeometry(curve,30,0.035,6,false),from:pa,to:pb});
    }
    return br;
  },[towers]);

  const packetData = useMemo(()=>Array.from({length:PACKETS},(_,i)=>({
    bIdx:i%bridges.length, prog:Math.random(), spd:0.006+Math.random()*0.009
  })),[bridges]);

  // Circuit trace lines (ground)
  const traceGeos = useMemo(()=>towers.map(tw=>{
    const pts=[new THREE.Vector3(0,-2,0),new THREE.Vector3(Math.cos(tw.angle)*tw.r,-2,Math.sin(tw.angle)*tw.r)];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }),[towers]);

  useFrame(({clock:{elapsedTime:t}})=>{
    if(cityRef.current) cityRef.current.rotation.y=t*0.07;
    if(scanRef.current){
      scanRef.current.position.y=-2+((t*0.5)%5.5);
      scanRef.current.material.opacity=0.04+Math.sin(t*2)*0.03;
    }
    packetRefs.current.forEach((p,i)=>{
      if(!p) return;
      const d=packetData[i]; d.prog=(d.prog+d.spd)%1;
      const pos=bridges[d.bIdx].curve.getPoint(d.prog);
      p.position.copy(pos);
    });
  });

  return (
    <Float speed={0.4} floatIntensity={0.2}>
      <group ref={cityRef} position={[4,0,0]}>
        {/* Platform base */}
        <mesh position={[0,-2.1,0]}>
          <cylinderGeometry args={[5.5,5.5,0.12,32]}/>
          <meshPhysicalMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.25} roughness={0.3} metalness={0.9} transparent opacity={0.6}/>
        </mesh>
        {/* Circuit traces on ground */}
        {traceGeos.map((g,i)=>(
          <line key={i}><bufferGeometry attach="geometry" {...g}/>
            <lineBasicMaterial attach="material" color="#34d399" transparent opacity={0.5}/></line>
        ))}
        {/* Hexagonal data towers */}
        {towers.map((tw,i)=>{
          const x=Math.cos(tw.angle)*tw.r, z=Math.sin(tw.angle)*tw.r, base=-2+tw.h/2;
          return (
            <group key={i} position={[x,base,z]}>
              <mesh><cylinderGeometry args={[0.3,0.35,tw.h,6]}/>
                <meshPhysicalMaterial color={tw.color} emissive={tw.color} emissiveIntensity={0.15} roughness={0.2} metalness={0.9} transparent opacity={0.18}/>
              </mesh>
              <mesh><cylinderGeometry args={[0.3,0.35,tw.h,6]}/>
                <meshStandardMaterial color={tw.color} emissive={tw.color} emissiveIntensity={0.9} wireframe/>
              </mesh>
              {/* Roof beacon */}
              <mesh position={[0,tw.h/2+0.1,0]}>
                <sphereGeometry args={[0.09,12,12]}/>
                <meshStandardMaterial color={tw.color} emissive={tw.color} emissiveIntensity={3}/>
              </mesh>
            </group>
          );
        })}
        {/* Arc bridge tubes */}
        {bridges.map((br,i)=>(
          <mesh key={i} geometry={br.geo}>
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.7} transparent opacity={0.45}/>
          </mesh>
        ))}
        {/* Flying data packets */}
        {Array.from({length:PACKETS}).map((_,i)=>(
          <mesh key={i} ref={el=>packetRefs.current[i]=el}>
            <octahedronGeometry args={[0.1,0]}/>
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={3}/>
          </mesh>
        ))}
        {/* Floating scan ring */}
        <mesh ref={scanRef} rotation={[Math.PI/2,0,0]}>
          <torusGeometry args={[5.5,0.04,8,80]}/>
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1} transparent opacity={0.07}/>
        </mesh>
        {/* Floating orbit rings */}
        {[3,4.2].map((r,i)=>(
          <mesh key={i} rotation={[Math.PI/6*(i+1),0,Math.PI/5*i]}>
            <torusGeometry args={[r,0.02,8,100]}/>
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.5} transparent opacity={0.2}/>
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ── SCENE SWITCHER ──
function Scene({ currentRoute }) {
  useFrame(({ camera, mouse }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x*2.5, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y*2+1, 0.025);
    camera.lookAt(0,0,0);
  });

  const r = currentRoute;
  return (
    <>
      <ambientLight intensity={0.25}/>
      <directionalLight position={[10,15,10]} intensity={0.6}/>
      <DynamicLights/>
      <Stars radius={130} depth={60} count={3500} factor={4} saturation={0} fade speed={0.4}/>
      {!r.startsWith('/sectors') && <HomeScene/>}
      {r==='/sectors/healthcare'   && <DNAScene/>}
      {r==='/sectors/architecture' && <BuildingScene/>}
      {r==='/sectors/edtech'       && <NeuralNetScene/>}
      {r==='/sectors/legaltech'    && <DataCityScene/>}
    </>
  );
}

export default function Background3D({ currentRoute }) {
  return (
    <Canvas camera={{ position:[0,1,13], fov:48 }} gl={{ antialias:true }}>
      <color attach="background" args={['#0A0F1E']}/>
      <fog attach="fog" args={['#0A0F1E', 18, 48]}/>
      <Scene currentRoute={currentRoute}/>
    </Canvas>
  );
}
