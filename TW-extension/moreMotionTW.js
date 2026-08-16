(function(Scratch) {
    'use strict';

    if (!Scratch) {
        console.warn('Scratch environment not found');
        return;
    }

    const EXTENSION_ID = 'moreMotion';
    const {ArgumentType, BlockType, TargetType, Cast} = Scratch;

    // 翻译系统 (TurboWarp兼容 - 中英双语)
    const _lang = (typeof navigator !== 'undefined' && (navigator.language || 'zh').toLowerCase().startsWith('zh')) ? 'zh' : 'en';

    const _messages = {
        zh: {
            "extensionName": "更多运动",
            "button": "📒 文档",
            "pathEditor": "绘制路径",
            "label.polar": "极坐标",
            "label.nonlinear": "非线性运动",
            "label.advanced": "高级运动",
            "label.utility": "工具",
            "label.motion": "移动",
            "label.setting": "设置",
            "label.performance": "性能优化",
            "label.group": "组",
            "block.createGroup": "创建组 [NAME] 添加角色",
            "block.addToGroup": "将角色 [SPRITE] 添加到组 [NAME]",
            "block.removeFromGroup": "将角色 [SPRITE] 从组 [NAME] 移除",
            "block.getGroupMembers": "获取组 [NAME] 的角色列表",
            "block.getSpriteGroup": "获取文件夹 [GROUP] 里的所有角色",
            "block.batchAddToGroup": "批量增加角色 [SPRITES] 进入组 [GROUP]",
            "block.setGroupMoveListen": "标记组 [GROUP] 移动监听为 [LISTEN]",
            "block.isGroupMoveListen": "组 [GROUP] 为监听状态?",
            "block.setGroupCenter": "设置组 [GROUP] 的中心点为 x:[X] y:[Y]",
            "block.rotateGroupRight": "让组 [GROUP] 向右旋转 [RIGHTICON] [ANGLE] 度",
            "block.rotateGroupLeft": "让组 [GROUP] 向左旋转 [LEFTICON] [ANGLE] 度",
            "block.pointGroupDirection": "让组 [GROUP] 面向 [ANGLE] 方向",
            "block.pointGroupTowards": "让组 [GROUP] 面向 [TARGET]",
            "label.motionpath": "运动轨迹",
            "block.createMotionPath": "创建轨迹 [NAME] 速度(像素/帧)[SPEED] 路径点数组 [POINTS]",
            "block.createMotionPathFromArray": "用位置数组创建轨迹 [NAME] 速度(像素/帧)[SPEED] 位置数组 [ARRAY]",
            "block.getMotionPathPoints": "获取轨迹 [NAME] 的属性 [PROP]",
            "block.setMotionPathFrame": "设置 [PATH] 轨迹当前的时间为 [N] 帧",
            "block.getMotionPathFrame": "轨迹 [NAME] 的当前帧",
            "block.moveAlongPath": "沿着轨迹 [PATH] 运动",
            "block.generateTrajectory": "用 y=[EXPRESSION] 生成轨迹 x从 [X_START] 到 [X_END] 步长 [STEP]",
            "block.moveGroup": "移动组 [NAME] [DISTANCE] 距离，角度 [ANGLE] 度",
            "block.goToGroupPosition": "将组 [NAME] 移动到 x:[X] y:[Y]",
            "block.moveGroupByVector": "移动组 [NAME] x:[X] y:[Y]",
            "block.goToGroupVector": "将组 [NAME] 移动到向量 [VECTOR]",
            "block.moveGroupPolar": "移动组 [NAME] [DISTANCE] 距离，角度 [ANGLE] 度",
            "block.goToGroupPolar": "将组 [NAME] 移动到极坐标 半径:[RADIUS] 角度:[ANGLE]",
            "block.movePolar": "移动 [DISTANCE] 距离，角度 [ANGLE] 度",
            "block.goToPolar": "移动到极坐标 半径:[RADIUS] 角度:[ANGLE]",
            "block.polarToXY": "极坐标转x 半径:[RADIUS] 角度:[ANGLE]",
            "block.polarToYY": "极坐标转y 半径:[RADIUS] 角度:[ANGLE]",
            "block.getPolarRadius": "计算极坐标半径 x:[X] y:[Y]",
            "block.getPolarAngle": "计算极坐标角度 x:[X] y:[Y]",
            "block.moveBezier": "贝塞尔曲线移动到 x:[ENDX] y:[ENDY] 控制点 x:[CTRLX] y:[CTRLY] 进度:[T]",
            "block.moveArc": "圆弧运动 半径:[RADIUS] 角度:[ANGLE] 方向:[DIRECTION]",
            "block.moveSpiral": "螺旋运动 半径:[RADIUS] 角度:[ANGLE] 扩展:[EXPANSION]",
            "block.moveEllipse": "椭圆运动 长轴:[A] 短轴:[B] 角度:[ANGLE]",
            "block.moveOrbit": "绕点轨道运动 中心x:[CX] y:[CY] 半径:[RADIUS] 角度:[ANGLE]",
            "block.moveWave": "波浪运动 振幅:[AMP] 频率:[FREQ] 相位:[PHASE]",
            "block.moveLissajous": "利萨茹曲线 A:[A] B:[B] 相位差:[DELTA] 时间:[T]",
            "block.degreesToRadians": "角度 [DEG] 转弧度",
            "block.radiansToDegrees": "弧度 [RAD] 转角度",
            "block.normalizeAngle": "规范化角度 [ANGLE]",
            "block.distanceToPoint": "到点 x:[X] y:[Y] 的距离",
            "block.angleToPoint": "到点 x:[X] y:[Y] 的角度",
            "block.thetaAngle": "ɵ角度",
            "block.rLength": "r长度",
            "block.goToVector": "移到向量 [VECTOR] 的位置",
            "block.moveByVector": "根据向量 [VECTOR] 移动",
            "block.setCoordinateSystem": "设置所有运动处于坐标系 [COORD_SYS] 下",
            "block.resetCoordinateSystem": "重置角色所在坐标系",
            "block.whenMoved": "当角色移动时",
            "block.movedFromX": "移动前的x",
            "block.movedFromY": "移动前的y",
            "block.movedToX": "现在的x",
            "block.movedToY": "现在的y",
            "block.createWaypoint": "创建或设置名称为 [NAME] 的路标 x:[X] y:[Y] 容差:[TOLERANCE]",
            "block.whenOnWaypoint": "当到达路标时",
            "block.customMotion": "使用自定义运动 [NAME] , 目标 x:[X] y:[Y], 额外参数",
            "block.whenCustomMotion": "自定义运动 [NAME] 被触发时",
            "block.repeatUntilReach": "重复执行直到到达坐标 x:[X] y:[Y] 误差:[TOLERANCE]",
            "block.repeatUntilFacing": "重复执行直到面向角度 [DIRECTION] 误差:[TOLERANCE]",
            "block.stopCustomMotion": "停止这个自定义运动",
            "block.setMoveListen": "标记角色[SPRITE]移动监听为[LISTEN]",
            "block.isMoveListen": "角色[SPRITE]为监听状态?",
            "label.integration": "坐标系",
            "label.cannotUseControlBlocks": "选中了舞台: 不可使用运动类积木",
            "menu.clockwise": "顺时针",
            "menu.counterClockwise": "逆时针",
            "menu.noCoordinateSystem": "无可用坐标系",
            "menu.listening": "监听",
            "menu.notListening": "不监听",
            "menu.myself": "自己",
            "menu.mousepoint": "鼠标指针",
            "menu.speed": "速率",
            "menu.velocityVector": "速度向量",
            "menu.positionVector": "位置向量",
            "menu.x": "x",
            "menu.y": "y",
            "menu.direction": "方向",
            "menu.positionVectorPolar": "位置向量(极坐标)",
            "menu.velocityVectorPolar": "速度向量(极坐标)",
            "menu.tolerance": "容差",
            "menu.motionPathProp.points": "位置数组",
            "menu.motionPathProp.speed": "速度",
            "label.motionProps": "运动属性",
            "label.waypointUtils": "路标工具",
            "block.getMotionProperty": "获取 [SPRITE] 的 [PROPERTY]",
            "block.getWaypointProperty": "获取路标 [WAYPOINT] 的 [PROPERTY]",
            "block.isOnWaypoint": "在路标 [WAYPOINT] 上?",
            "block.vector.tooltip": "将多个值组合成JSON数组",
            "block.whenMoved.tooltip": "当角色位置发生变化时触发",
            "block.createWaypoint.tooltip": "创建或更新一个路标，记录特定坐标位置",
            "block.whenOnWaypoint.tooltip": "当角色到达指定路标时触发",
            "block.lastWaypointName": "到达的路标名称",
            "block.lastWaypointName.tooltip": "返回最近一次到达的路标名称",
            "block.customMotion.tooltip": "触发自定义运动事件，传递目标坐标和额外参数",
            "block.whenCustomMotion.tooltip": "当收到自定义运动事件时触发",
            "block.customMotionX": "自定义运动目标x",
            "block.customMotionX.tooltip": "自定义运动的目标x坐标",
            "block.customMotionY": "自定义运动目标y",
            "block.customMotionY.tooltip": "自定义运动的目标y坐标",
            "block.customMotionExtraArgs": "自定义运动额外参数",
            "block.customMotionExtraArgs.tooltip": "自定义运动的额外参数(JSON格式)",
            "block.repeatUntilReach.tooltip": "重复执行C型槽内的代码，直到角色到达目标坐标",
            "block.repeatUntilFacing.tooltip": "重复执行C型槽内的代码，直到角色面向目标角度",
            "block.movePolar.tooltip": "沿极坐标方向移动指定距离",
            "block.goToPolar.tooltip": "移动到极坐标指定的位置",
            "block.polarToXY.tooltip": "将极坐标转换为X坐标",
            "block.polarToYY.tooltip": "将极坐标转换为Y坐标",
            "block.getPolarRadius.tooltip": "计算笛卡尔坐标对应的极坐标半径",
            "block.getPolarAngle.tooltip": "计算笛卡尔坐标对应的极坐标角度",
            "block.thetaAngle.tooltip": "获取角色当前方向的弧度值",
            "block.rLength.tooltip": "获取角色到原点的距离",
            "block.moveBezier.tooltip": "沿贝塞尔曲线移动到目标位置",
            "block.moveArc.tooltip": "沿圆弧路径运动",
            "block.moveSpiral.tooltip": "沿螺旋线路径运动",
            "block.moveEllipse.tooltip": "沿椭圆路径运动",
            "block.moveOrbit.tooltip": "绕指定中心点做轨道运动",
            "block.moveWave.tooltip": "沿波浪路径运动",
            "block.moveLissajous.tooltip": "沿利萨如曲线运动",
            "block.distanceToPoint.tooltip": "计算角色到指定点的距离",
            "block.setMoveListen.tooltip": "设置角色是否监听移动事件",
            "block.isMoveListen.tooltip": "检查角色是否在监听移动事件",
            "block.movedFromX.tooltip": "获取移动前的X坐标",
            "block.movedFromY.tooltip": "获取移动前的Y坐标",
            "block.movedToX.tooltip": "获取移动后的X坐标",
            "block.movedToY.tooltip": "获取移动后的Y坐标",
            "block.goToVector.tooltip": "移动到向量指定的位置",
            "block.moveByVector.tooltip": "按向量移动指定距离",
            "block.normalizeAngle.tooltip": "将角度标准化到0-360度范围",
            "block.angleToPoint.tooltip": "计算角色到指定点的角度",
            "block.getMotionProperty.tooltip": "获取指定角色的运动属性（速率、速度向量或位置向量）",
            "block.getWaypointProperty.tooltip": "获取指定路标的属性（x坐标、y坐标或容差）",
            "block.isOnWaypoint.tooltip": "检查角色是否在指定路标的容差范围内",
            "block.createGroup.tooltip": "创建一个新组并添加角色",
            "block.addToGroup.tooltip": "将角色添加到指定组",
            "block.removeFromGroup.tooltip": "将角色从指定组移除",
            "block.getGroupMembers.tooltip": "获取组内所有角色的名称列表",
            "block.getSpriteGroup.tooltip": "获取指定角色分组的所有角色",
            "block.batchAddToGroup.tooltip": "批量将角色列表中的角色添加到指定组",
            "block.setGroupMoveListen.tooltip": "设置组的移动监听状态",
            "block.isGroupMoveListen.tooltip": "检查组是否处于移动监听状态",
            "block.cacheRadian": "缓存角度 [ANGLE] 的弧度值",
            "block.getCachedRadian": "获取缓存的角度 [ANGLE] 弧度值",
            "block.setCalcCache": "设置缓存 [KEY] 为 [VALUE]",
            "block.getCalcCache": "获取缓存 [KEY]",
            "block.clearCaches": "清除所有缓存",
            "block.batchMoveGroup": "批量移动组 [GROUP] x:[DX] y:[DY]",
            "block.cacheRadian.tooltip": "预计算并缓存角度对应的弧度值，后续使用该角度时更快",
            "block.getCachedRadian.tooltip": "获取已缓存的弧度值，若未缓存则自动计算并缓存",
            "block.setCalcCache.tooltip": "将一个值存储到通用缓存中，便于后续快速读取",
            "block.getCalcCache.tooltip": "从通用缓存中读取已存储的值",
            "block.clearCaches.tooltip": "清除所有弧度缓存和通用计算缓存",
            "block.batchMoveGroup.tooltip": "一次性移动整个组所有成员，比逐个移动更高效",
            "block.setGroupCenter.tooltip": "设置组的中心点坐标",
            "block.rotateGroupRight.tooltip": "让组内所有角色向右旋转指定角度",
            "block.rotateGroupLeft.tooltip": "让组内所有角色向左旋转指定角度",
            "block.pointGroupDirection.tooltip": "让组内所有角色面向指定角度",
            "block.pointGroupTowards.tooltip": "让组内所有角色面向指定目标",
            "block.createMotionPath.tooltip": "创建一个运动轨迹，包含多个路径点",
            "block.createMotionPathFromArray.tooltip": "使用位置数组创建运动轨迹，数组格式为[[x1,y1],[x2,y2],...]",
            "block.getMotionPathPoints.tooltip": "获取指定轨迹的属性（位置数组或速度）",
            "block.setMotionPathFrame.tooltip": "设置轨迹当前的帧数（进度位置）",
            "block.getMotionPathFrame.tooltip": "获取轨迹当前的帧数（进度位置）",
            "block.moveAlongPath.tooltip": "让角色沿着指定轨迹运动",
            "block.generateTrajectory.tooltip": "根据函数表达式生成轨迹位置数组，返回[[x1,y1],[x2,y2],...]格式",
            "block.moveGroup.tooltip": "移动整个组",
            "block.goToGroupPosition.tooltip": "将整个组移动到指定位置",
            "block.radiansToDegrees.tooltip": "将弧度转换为角度",
            "block.degreesToRadians.tooltip": "将角度转换为弧度",
            "vector": "向量 x:[X] y:[Y]"
        },
        en: {
            "extensionName": "Motion +",
            "button": "📒 Documentation",
            "pathEditor": "Path Editor",
            "label.polar": "Polar Coordinates",
            "label.nonlinear": "Non-linear Motion",
            "label.advanced": "Advanced Motion",
            "label.utility": "Utility",
            "label.motion": "Motion",
            "label.setting": "Setting",
            "label.performance": "Performance",
            "label.group": "Group",
            "block.createGroup": "create group [NAME] add sprites",
            "block.addToGroup": "add sprite [SPRITE] to group [NAME]",
            "block.removeFromGroup": "remove sprite [SPRITE] from group [NAME]",
            "block.getGroupMembers": "get group [NAME] members",
            "block.getSpriteGroup": "get all sprites in folder [GROUP]",
            "block.batchAddToGroup": "batch add sprites [SPRITES] to group [GROUP]",
            "block.setGroupMoveListen": "set group [GROUP] move listen to [LISTEN]",
            "block.isGroupMoveListen": "is group [GROUP] listening?",
            "block.setGroupCenter": "set group [GROUP] center to x:[X] y:[Y]",
            "block.rotateGroupRight": "turn group [GROUP] cw [RIGHTICON] [ANGLE] degrees",
            "block.rotateGroupLeft": "turn group [GROUP] ccw [LEFTICON] [ANGLE] degrees",
            "block.pointGroupDirection": "point group [GROUP] in direction [ANGLE]",
            "block.pointGroupTowards": "point group [GROUP] towards [TARGET]",
            "label.motionpath": "Motion Path",
            "block.createMotionPath": "create path [NAME] speed (px/frame)[SPEED] points array [POINTS]",
            "block.createMotionPathFromArray": "create path [NAME] from array speed (px/frame)[SPEED] positions [ARRAY]",
            "block.getMotionPathPoints": "get path [NAME] property [PROP]",
            "block.setMotionPathFrame": "set path [PATH] current frame to [N]",
            "block.getMotionPathFrame": "path [NAME] current frame",
            "block.moveAlongPath": "move along path [PATH]",
            "block.generateTrajectory": "generate trajectory y=[EXPRESSION] x from [X_START] to [X_END] step [STEP]",
            "block.moveGroup": "move group [NAME] [DISTANCE] at angle [ANGLE]",
            "block.goToGroupPosition": "go group [NAME] to x:[X] y:[Y]",
            "block.moveGroupByVector": "move group [NAME] by x:[X] y:[Y]",
            "block.goToGroupVector": "go group [NAME] to vector [VECTOR]",
            "block.moveGroupPolar": "move group [NAME] [DISTANCE] at angle [ANGLE]",
            "block.goToGroupPolar": "go group [NAME] to polar r:[RADIUS] angle:[ANGLE]",
            "block.movePolar": "move [DISTANCE] at angle [ANGLE] degrees",
            "block.goToPolar": "go to polar r: [RADIUS] angle: [ANGLE]",
            "block.polarToXY": "polar to x r: [RADIUS] angle: [ANGLE]",
            "block.polarToYY": "polar to y r: [RADIUS] angle: [ANGLE]",
            "block.getPolarRadius": "polar radius to x: [X] y: [Y]",
            "block.getPolarAngle": "polar angle to x: [X] y: [Y]",
            "block.moveBezier": "move bezier to x: [ENDX] y: [ENDY] control x: [CTRLX] y: [CTRLY] t: [T]",
            "block.moveArc": "move arc radius: [RADIUS] angle: [ANGLE] direction: [DIRECTION]",
            "block.moveSpiral": "move spiral radius: [RADIUS] angle: [ANGLE] expansion: [EXPANSION]",
            "block.moveEllipse": "move ellipse a: [A] b: [B] angle: [ANGLE]",
            "block.moveOrbit": "orbit around x: [CX] y: [CY] radius: [RADIUS] angle: [ANGLE]",
            "block.moveWave": "move wave amplitude: [AMP] frequency: [FREQ] phase: [PHASE]",
            "block.moveLissajous": "lissajous a: [A] b: [B] delta: [DELTA] t: [T]",
            "block.degreesToRadians": "degrees [DEG] to radians",
            "block.radiansToDegrees": "radians [RAD] to degrees",
            "block.normalizeAngle": "normalize angle [ANGLE]",
            "block.distanceToPoint": "distance to x: [X] y: [Y]",
            "block.angleToPoint": "angle to x: [X] y: [Y]",
            "block.thetaAngle": "ɵ angle",
            "block.rLength": "r length",
            "block.goToVector": "go to vector [VECTOR] position",
            "block.moveByVector": "move by vector [VECTOR]",
            "block.setCoordinateSystem": "set all motion in coordinate system [COORD_SYS]",
            "block.resetCoordinateSystem": "reset character coordinate system",
            "block.whenMoved": "when sprite moved",
            "block.movedFromX": "moved from x",
            "block.movedFromY": "moved from y",
            "block.movedToX": "moved to x",
            "block.movedToY": "moved to y",
            "block.createWaypoint": "create or set waypoint [NAME] to x:[X] y:[Y] tolerance:[TOLERANCE]",
            "block.whenOnWaypoint": "when moved on waypoint",
            "block.customMotion": "use custom motion [NAME], target x:[X] y:[Y], extra params",
            "block.whenCustomMotion": "custom motion [NAME] triggered",
            "block.repeatUntilReach": "repeat until reach x:[X] y:[Y] tolerance:[TOLERANCE]",
            "block.repeatUntilFacing": "repeat until facing [DIRECTION] tolerance:[TOLERANCE]",
            "block.stopCustomMotion": "stop this custom motion",
            "block.setMoveListen": "set sprite [SPRITE] move listen to [LISTEN]",
            "block.isMoveListen": "is sprite [SPRITE] listening?",
            "label.integration": "Coordinate System",
            "label.cannotUseControlBlocks": "Selected stage: Cannot use motion blocks",
            "menu.clockwise": "clockwise",
            "menu.counterClockwise": "counter-clockwise",
            "menu.noCoordinateSystem": "No coordinate system available",
            "menu.listening": "listening",
            "menu.notListening": "not listening",
            "menu.myself": "myself",
            "menu.mousepoint": "mouse point",
            "menu.speed": "speed",
            "menu.velocityVector": "velocity vector",
            "menu.positionVector": "position vector",
            "menu.x": "x",
            "menu.y": "y",
            "menu.direction": "direction",
            "menu.positionVectorPolar": "position vector (polar)",
            "menu.velocityVectorPolar": "velocity vector (polar)",
            "menu.tolerance": "tolerance",
            "menu.motionPathProp.points": "position array",
            "menu.motionPathProp.speed": "speed",
            "label.motionProps": "Motion Properties",
            "label.waypointUtils": "Waypoint Utilities",
            "block.getMotionProperty": "get [SPRITE] [PROPERTY]",
            "block.getWaypointProperty": "get waypoint [WAYPOINT] [PROPERTY]",
            "block.isOnWaypoint": "on waypoint [WAYPOINT]?",
            "block.vector.tooltip": "Combine multiple values into a JSON array",
            "block.whenMoved.tooltip": "Triggered when the sprite position changes",
            "block.createWaypoint.tooltip": "Create or update a waypoint at a specific position",
            "block.whenOnWaypoint.tooltip": "Triggered when the sprite reaches a waypoint",
            "block.lastWaypointName": "reached waypoint name",
            "block.lastWaypointName.tooltip": "Returns the name of the last reached waypoint",
            "block.customMotion.tooltip": "Trigger a custom motion event with target coordinates and extra parameters",
            "block.whenCustomMotion.tooltip": "Triggered when a custom motion event is received",
            "block.customMotionX": "custom motion target x",
            "block.customMotionX.tooltip": "Target x coordinate of custom motion",
            "block.customMotionY": "custom motion target y",
            "block.customMotionY.tooltip": "Target y coordinate of custom motion",
            "block.customMotionExtraArgs": "custom motion extra params",
            "block.customMotionExtraArgs.tooltip": "Extra parameters of custom motion (JSON format)",
            "block.repeatUntilReach.tooltip": "Repeat the blocks inside until the sprite reaches the target position",
            "block.repeatUntilFacing.tooltip": "Repeat the blocks inside until the sprite faces the target direction",
            "block.movePolar.tooltip": "Move in polar coordinate direction",
            "block.goToPolar.tooltip": "Go to a position specified by polar coordinates",
            "block.polarToXY.tooltip": "Convert polar coordinates to X coordinate",
            "block.polarToYY.tooltip": "Convert polar coordinates to Y coordinate",
            "block.getPolarRadius.tooltip": "Calculate the radius from Cartesian coordinates",
            "block.getPolarAngle.tooltip": "Calculate the angle from Cartesian coordinates",
            "block.thetaAngle.tooltip": "Get the current direction in radians",
            "block.rLength.tooltip": "Get the distance from the origin",
            "block.moveBezier.tooltip": "Move along a Bezier curve to the target",
            "block.moveArc.tooltip": "Move along an arc path",
            "block.moveSpiral.tooltip": "Move along a spiral path",
            "block.moveEllipse.tooltip": "Move along an elliptical path",
            "block.moveOrbit.tooltip": "Orbit around a center point",
            "block.moveWave.tooltip": "Move along a wave path",
            "block.moveLissajous.tooltip": "Move along a Lissajous curve",
            "block.distanceToPoint.tooltip": "Calculate distance to a point",
            "block.setMoveListen.tooltip": "Set whether the sprite listens for move events",
            "block.isMoveListen.tooltip": "Check if the sprite is listening for move events",
            "block.movedFromX.tooltip": "Get the X coordinate before moving",
            "block.movedFromY.tooltip": "Get the Y coordinate before moving",
            "block.movedToX.tooltip": "Get the X coordinate after moving",
            "block.movedToY.tooltip": "Get the Y coordinate after moving",
            "block.goToVector.tooltip": "Go to position specified by vector",
            "block.moveByVector.tooltip": "Move by vector displacement",
            "block.normalizeAngle.tooltip": "Normalize angle to 0-360 degree range",
            "block.angleToPoint.tooltip": "Calculate angle to a point",
            "block.getMotionProperty.tooltip": "Get motion property of specified sprite (speed, velocity vector, or position vector)",
            "block.getWaypointProperty.tooltip": "Get property of a waypoint (x, y, or tolerance)",
            "block.isOnWaypoint.tooltip": "Check if sprite is within tolerance of a waypoint",
            "block.createGroup.tooltip": "Create a new group and add sprites",
            "block.addToGroup.tooltip": "Add a sprite to specified group",
            "block.removeFromGroup.tooltip": "Remove a sprite from specified group",
            "block.getGroupMembers.tooltip": "Get list of all sprite names in the group",
            "block.getSpriteGroup.tooltip": "Get all sprites in specified group",
            "block.batchAddToGroup.tooltip": "Batch add sprites from list to specified group",
            "block.setGroupMoveListen.tooltip": "Set move listening state for group",
            "block.isGroupMoveListen.tooltip": "Check if group is in move listening state",
            "block.cacheRadian": "cache radian for angle [ANGLE]",
            "block.getCachedRadian": "get cached radian for angle [ANGLE]",
            "block.setCalcCache": "set cache [KEY] to [VALUE]",
            "block.getCalcCache": "get cache [KEY]",
            "block.clearCaches": "clear all caches",
            "block.batchMoveGroup": "batch move group [GROUP] x:[DX] y:[DY]",
            "block.cacheRadian.tooltip": "Pre-compute and cache radian value for an angle, faster for repeated use",
            "block.getCachedRadian.tooltip": "Get cached radian value, auto-compute and cache if not found",
            "block.setCalcCache.tooltip": "Store a value in general cache for fast retrieval later",
            "block.getCalcCache.tooltip": "Read a stored value from general cache",
            "block.clearCaches.tooltip": "Clear all radian cache and general calculation cache",
            "block.batchMoveGroup.tooltip": "Move all members of a group at once, more efficient than moving individually",
            "block.setGroupCenter.tooltip": "Set center point coordinates for group",
            "block.rotateGroupRight.tooltip": "Rotate all sprites in group clockwise",
            "block.rotateGroupLeft.tooltip": "Rotate all sprites in group counter-clockwise",
            "block.pointGroupDirection.tooltip": "Point all sprites in group to direction",
            "block.pointGroupTowards.tooltip": "Point all sprites in group towards target",
            "block.createMotionPath.tooltip": "Create a motion path with multiple points",
            "block.createMotionPathFromArray.tooltip": "Create a motion path from position array, format: [[x1,y1],[x2,y2],...]",
            "block.getMotionPathPoints.tooltip": "Get property of specified path (position array or speed)",
            "block.setMotionPathFrame.tooltip": "Set the current frame (progress position) of a path",
            "block.getMotionPathFrame.tooltip": "Get the current frame (progress position) of a path",
            "block.moveAlongPath.tooltip": "Move sprite along specified path",
            "block.generateTrajectory.tooltip": "Generate trajectory position array from function expression, returns [[x1,y1],[x2,y2],...] format",
            "block.moveGroup.tooltip": "Move the entire group",
            "block.goToGroupPosition.tooltip": "Move entire group to specified position",
            "block.radiansToDegrees.tooltip": "Convert radians to degrees",
            "block.degreesToRadians.tooltip": "Convert degrees to radians",
            "vector": "Vector x:[X] y:[Y]"
        }
    };

    function translate(opts) {
        const id = opts.id || opts;
        const dict = _messages[_lang] || _messages.zh;
        return dict[id] || (_messages.zh[id]) || id;
    }
    
    // Icon for the extension
    const EXTENSION_ICON = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNC41NDgxOCIgaGVpZ2h0PSIzMy41MTk4OSIgdmlld0JveD0iMCwwLDM0LjU0ODE4LDMzLjUxOTg5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzAyLjcyNTkxLC0xNjMuMjQwMDUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMzAzLjk3NTkxLDE3My4yMzA0N3YtOC43NDA0MWg5LjA4MzE3IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTMxMy4wNTkwOCwxOTUuNTA5OTVoLTkuMDgzMTd2LTguNzQwNDEiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTMyNi45NDA5MiwxNjQuNDkwMDVoOS4wODMxN3Y4Ljc0MDQxIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMzYuMDI0MDksMTg2Ljc2OTUzdjguNzQwNDFoLTkuMDgzMTciIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTMwOC4yNDA1OCwxODBjMCwtNi40OTQ1NSA1LjI2NDg3LC0xMS43NTk0MyAxMS43NTk0MiwtMTEuNzU5NDNjNi40OTQ1NSwwIDExLjc1OTQyLDUuMjY0ODggMTEuNzU5NDIsMTEuNzU5NDNjMCw2LjQ5NDU1IC01LjI2NDg3LDExLjc1OTQzIC0xMS43NTk0MiwxMS43NTk0M2MtNi40OTQ1NSwwIC0xMS43NTk0MiwtNS4yNjQ4OCAtMTEuNzU5NDIsLTExLjc1OTQzeiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTMxMy4xNjg2LDE4MS4yMzM0NXYtMi40NjY5aDEzLjY2Mjh2Mi40NjY5eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0zMjEuMjMzNDUsMTg2LjgzMTRoLTIuNDY2OXYtMTMuNjYyOGgyLjQ2Njl6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPjwvZz48L3N2Zz4=';
    const EXTENSION_PICTURE = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2NDcuNSIgaGVpZ2h0PSIzNjQuNzE5ODMiIHZpZXdCb3g9IjAsMCw2NDcuNSwzNjQuNzE5ODMiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNSwyKSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0tMywzNjIuMjE5ODN2LTM2My43MTk4M2g2NDYuNXYzNjMuNzE5ODN6IiBmaWxsPSIjNGM5N2ZmIiBzdHJva2U9IiMzMzczY2MiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48ZyBzdHJva2U9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xMDMuNzI1OTEsMTU4LjEyNzU0di0yOC4yNDA0aDI5LjM0Nzg3IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjcuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTEzMy4wNzM3OCwyMzAuMTEyOWgtMjkuMzQ3ODd2LTI4LjI0MDQiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjcuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTE3Ny45MjYyMiwxMjkuODg3MWgyOS4zNDc4N3YyOC4yNDA0IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSI3LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMDcuMjc0MDksMjAxLjg3MjQ2djI4LjI0MDRoLTI5LjM0Nzg3IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSI3LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMTcuNTA1MTMsMTgwYzAsLTIwLjk4Mzk5IDE3LjAxMDg4LC0zNy45OTQ5MSAzNy45OTQ4NywtMzcuOTk0OTFjMjAuOTgzOTksMCAzNy45OTQ4NywxNy4wMTA5MSAzNy45OTQ4NywzNy45OTQ5MWMwLDIwLjk4Mzk5IC0xNy4wMTA4OCwzNy45OTQ5MSAtMzcuOTk0ODcsMzcuOTk0OTFjLTIwLjk4Mzk5LDAgLTM3Ljk5NDg3LC0xNy4wMTA5MSAtMzcuOTk0ODcsLTM3Ljk5NDkxeiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSI3LjUiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTEzMy40Mjc2NCwxODMuOTg1M3YtNy45NzA1OWg0NC4xNDQ3MnY3Ljk3MDU5eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0xNTkuNDg1MywyMDIuMDcyMzZoLTcuOTcwNTl2LTQ0LjE0NDcyaDcuOTcwNTl6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPjxnIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZvbnQtc2l6ZT0iNDAiIHRleHQtYW5jaG9yPSJzdGFydCI+PHRleHQgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjk3Ljc1ODk0LDE4MC44MjE5NSkgc2NhbGUoMS4zMjgwMSwxLjMyODAxKSIgZm9udC1zaXplPSI0MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjx0c3BhbiB4PSIwIiBkeT0iMCI+5pu05aSa6L+Q5YqoPC90c3Bhbj48L3RleHQ+PHRleHQgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ1LjI1ODk0LDIyMi4yMDE5KSBzY2FsZSgwLjkzNDUxLDAuOTM0NTEpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj5tb3Rpb24gKzwvdHNwYW4+PC90ZXh0PjwvZz48L2c+PC9nPjwvc3ZnPg==';

    const turnrighticon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAqCAYAAADI3bkcAAAAAXNSR0IArs4c6QAABPdJREFUWEfVmW1QVFUYx+/dFxdYWFBEGNBAS3ISTdgFRtnF7eUDGpFGjBrNNNNk9qHyDXUvTc7ONMji4DBUzjTNNFCDNZPlNJXTqwaCQrILhtg4BEjaQAYhw2LL8nJv8/wPiy4stgKR9/nyu3vuuef+z/+ee+5zzvLcNMNscTxAl47wUhZRIfEriRIvxaBJnrvCwF0mjvL8T8SzBfo6X7dcLzSsZdeLu0GRayRW2wyFt9fnp6mXu+cFGy31ZjjG86VEbYByNdGcMB99fmiJFowMmwde7xsCr3YPgq1df4P2NuePRKUkHoCTKqkH7UqqJmJB7rJgYulX11g7ve4k4hlbMhz32+F7X7BVUlCPTG5HETFUq8oj7sxcgp4/uoo5q1D43WfUb+oYAA+f+I09gZ7BbuKBp2MjiE8YFqK85Iur4InabguxxmaAjqnvJjfBJqG+hHqUsjx0F/Hg1qXosS5QBc40RFFCE3Ut/eC6FaFeTZ5uuoHf1o/bTxKrbYbMOzosG8EmwbGdehIfHfge8eiOB9FTjRpDes6i3zWCe2W++XMvHC40hPt0WDaCTUID3lKthsPrW7EnIZAYHqL26WpjuxPlX9ZjGuWqmtmY0wYowdVxmE65DXr21qdNGKP+PqptR5pR9Vq3K8HLYdkJNgqOd6kHr2yM2UHcYoz0aULZqS6Ul53qbMABz+cTgp26SqJT6wpCuXLYiNOiKBAzEhciV8jPifPXXNSzfdYBnrT3Qtf4PCw7waZ8O744Xx9cg0Gn1bCx6ImWTpYLvHT0ci0xyKl7BPXfXu72ZZneaofTQYMcnkTe5lhMN1kpbEz7G980/IWqhcc7PvRyWDaCzZZGDKqYCDXy14o9SGsnxa73W1B2oW0gnVhVqK++k0tGi72YzuekLdpLfG0sB/HXWU+9zl72ALcWN7fCYdkJNgn1aaQ8cZmuhlj6YrxPE7KLLqK8d1AZQqy0rmRp1xRhEhzf06mdTy5+nHh/FKb1uw6naxTXvH6sjeXNshNsFOypcHhpCNZab233dtiTVZnfaEAPqw8Z8EX8tzBaHBlwhOeQz840JI77AO3JTvB6y/lkUh6m05wnfi5gqTYeEktbueyipmHiDbe4iFhpTeybqWvTuZ6XnWCz9RLSqlG3C1+6j/YmBBAXh2u8DCg/PZ5DYAVy5pABq+e5Dl52gj0OmQR7BR0/mx6VS3w5g23geMKzz5Bbcul3KnONcsjGzhUkseXvHMV4tiY7wWbBvoJMUqkVSPE/3b8K6Vqo1nuV7Flp7Cv/tZPOu4dFE7HGltw+FyaPOyw7wbfGMtuPyEyOwGywf3OsT+MuXGFrun3lrZifh4akH4gizx0nSqP8t8Szh5PwJGYrJu38ePYjZCN47e5zSKtUAfOQbeVtug/ZXFaK7xTipptlU45W5njNL+wD6HkCf/QNHaPf1YWG52bD5UkOy06wx4VUa52OjgOGVVXEFx6LXkPclh6FKmqlf7uWzxQ1YQvH2cOFEb8rfvjmTJye8q6yE+xx4dYQUZdRWVSYZgvxqVQ2pjfoseXFLQj2vUOUbbuILfiuPwcWEGtL1rn+E4dlK3iiGybBvmms7PkxbiTOD1bjz43IUOZ0jxPTM9fTP/IOmyX0r87EWc+1/r05t91JdoInupST8wlyjuvxcdFEUVSAqiGujVh5xMC2N2cp7trh/1vwP9cs2QedJT9+AAAAAElFTkSuQmCC";

    const turnlefticon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAqCAYAAADI3bkcAAAAAXNSR0IArs4c6QAABOxJREFUWEfVWXtQVFUYv2dhYUleogQ0hmKQZTO5speQQR5ajTE2aZPj2OQYZWN/NOjYg9xddGgqFmY0J5txJiMipwfV9JqEnCbLdokIlmoYhXQFUcEHtirChjyW03y/s5eJZWFFRL3fP7+955x77u/87ne/c75vmeRl6eaGRdSk4TwFXVxTQWCzJJ/3HkvX2YU/BxK6+yLuJmQSv0eM47jmjJ0Fct5MWG0x1Il+xn3N56+NqZZwdn7tLCIfFq5rJcxdGqclfKey3YlFuTUywQB3D0EfJm0kDNYGbCCcfXtwGDBah+ExkUHAzq5+YPMpF7Dd2Sfmk6TPMW2AtIOw5g25xZ+6eK4ySHWEM432p4n8w/qocsKC1QlYS4XtHHD39+3w4aAANoPwyaxYDeG6JXHo1waM8i6fgrWc7UX7/j+E0F/Vdg4SDgxKbxE6g3VbCZsK7xOvxsuGn6I6wouN9lJazEsr4tcTrkyNHrG2937owHWOYSZw1oxgnwpOtNHZPYBbtn9zEljdfOkToEV+alyFVUc4w2RvohWV582/l3BubMhExZrU+IFBEZY3lh4BHjrh2gKli+WS/0887MOqIZyeX434GXrbtMuEVdv0WJDm6j764cUrvmg9fAltjW09wIsu4aNKfFa+jYQY32+wy4WgIa3ZfghRwtXvnkNoK5LPEDLVEc4w2ZcT85TE8H2EO55JmpAvvv/jaYz/1Hqui7B/cGgvlGBSLVDiiN9DnC3Gm9OwPMKXV8RPJ3w0RUQdbyvzzPvhT2d2UZ/VIm/CfGokXETMn33wDiNh7lKxc12tfflbJ4a+ve+kFb4WJC9BQyHDmcPbsl+pi6U2rg2swX3PJWFLXZAQOmJod68b18tf/+sC5rXI2GFJYZURNjYcJOY71ydlERruQtCYsL1WcRz3HGi8aBaKGCDEWJZuqs/B8xLCq4TSOD6PsrU7D6Pt+IUriUJh9RG2txHzsrz5swkT465th2v1nMJydzU1eHwO5+exLG1zDR40PSoEB+XKAr3PyP9imQNT1Du68G2wDKPqCNevEiqwPR41EB+vwbrFNBwZiK0oBbmgP8sw2k/RmKptemQ8obqAEbfklx/Dda2j+yGPwioj7E+BqepXfDgiMgSpx3fmBfDpQK/MZcteoXDNkcuPQOGpIuRvXtURzjQ1rKZFLVsY9RmhaRUOZcPGPVWLJ0oa0ebs6Yu/qQqrhvBwpag/9AApVrIuKZMwbV7ECIX/bBVBZ1PpUVSKbBY59aYorBrChg12VJKmRbFv4bvJUThLGD2+y7w+/xfe9eR2ba41NM5abICv37AoccsTzjTX3UmKcM7ETsrZWoLHF0UnE25+DB/9KFNywoKPW371+C4yFcWmTOFbnnD6q3YoEROpLSa8f05YOqFyvtbPFefssSpGHc4+9D+/uxlpd1dvP6JCtSX16JQorDrCWaYGFMf2F+rhuzotipt+ra3zCsaYPzqGsmbH+V5kPr8UP1Dv6+br5sOqIZyT50AZc2hmD7amqq16xNuxKkcnPIp+USOy7cr6f37HD85zCQ5a5L/Hey2TVlh1hBU1Moz2r+l32ryIlYRK9VP5j0PxVcfpf5FeM4m/SWgNlj/AHGPUMbzVnrTCqiWsHMgDdUHLhE9KqDMzJoni25AGylpLFtrEIq/T/3TjOfx4fTeK8H8WdOl31/lNoAAAAABJRU5ErkJggg==";

    let EXTENSION_BLOCKS = [
                    {
                        blockType: BlockType.BUTTON,
                        text: translate({id: 'button'}),
                        func: 'docs'
                    },
                    '---',
                    { blockType: Scratch.BlockType.LABEL, text: translate({id: 'label.cannotUseControlBlocks'}) },
                    '---',
                    // Polar Coordinates Category
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.motion'})
                    },
                    {
                        opcode: 'goToVector',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.goToVector'}),
                        arguments: {
                            VECTOR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[0, 0]'
                            }
                        },
                        tooltip: translate({id: 'block.goToVector.tooltip'})
                    },
                    {
                        opcode: 'moveByVector',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveByVector'}),
                        arguments: {
                            VECTOR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[10, 0]'
                            }
                        },
                        tooltip: translate({id: 'block.moveByVector.tooltip'})
                    },
                    {
                        opcode: 'vector',
                        blockType: BlockType.REPORTER,
                        text: translate({id: 'vector'}),
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                    },
                    '---',
                    {
                        opcode: 'whenMoved',
                        blockType: BlockType.HAT,
                        text: translate({id: 'block.whenMoved'}),
                        isEdgeActivated: false,
                        tooltip: translate({id: 'block.whenMoved.tooltip'})
                    },
                    {
                        opcode: 'movedFromX',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.movedFromX'}),
                        tooltip: translate({id: 'block.movedFromX.tooltip'})
                    },
                    {
                        opcode: 'movedFromY',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.movedFromY'}),
                        tooltip: translate({id: 'block.movedFromY.tooltip'})
                    },
                    {
                        opcode: 'movedToX',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.movedToX'}),
                        tooltip: translate({id: 'block.movedToX.tooltip'})
                    },
                    {
                        opcode: 'movedToY',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.movedToY'}),
                        tooltip: translate({id: 'block.movedToY.tooltip'})
                    },
                    '---',
                    {
                        opcode: 'createWaypoint',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.createWaypoint'}),
                        isEdgeActivated: false,
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Waypoint'
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            TOLERANCE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            },
                        },
                        tooltip: translate({id: 'block.createWaypoint.tooltip'})
                    },
                    {
                        opcode: 'whenOnWaypoint',
                        blockType: BlockType.HAT,
                        text: translate({id: 'block.whenOnWaypoint'}),
                        isEdgeActivated: false,
                        tooltip: translate({id: 'block.whenOnWaypoint.tooltip'})
                    },
                    {
                        opcode: 'lastWaypointName',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.lastWaypointName'}),
                        tooltip: translate({id: 'block.lastWaypointName.tooltip'})
                    },
                    {
                        opcode: 'getWaypointProperty',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.getWaypointProperty'}),
                        arguments: {
                            WAYPOINT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Waypoint'
                            },
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'waypointProperty',
                                defaultValue: 'x'
                            }
                        },
                        tooltip: translate({id: 'block.getWaypointProperty.tooltip'})
                    },
                    {
                        opcode: 'isOnWaypoint',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: translate({id: 'block.isOnWaypoint'}),
                        arguments: {
                            WAYPOINT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Waypoint'
                            }
                        },
                        tooltip: translate({id: 'block.isOnWaypoint.tooltip'})
                    },
                    {
                        opcode: 'waypointName',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Waypoint[WAYPOINT]',
                        arguments: {
                            WAYPOINT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'waypointMenu2',
                                defaultValue: ''
                            }
                        },
                    },
                    '---',
                    {
                        opcode: 'getMotionProperty',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.getMotionProperty'}),
                        arguments: {
                            SPRITE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'spriteMenu',
                                defaultValue: '_myself_'
                            },
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'motionProperty',
                                defaultValue: 'speed'
                            }
                        },
                        tooltip: translate({id: 'block.getMotionProperty.tooltip'})
                    },
                    '---',
                    {
                        opcode: 'repeatUntilReach',
                        blockType: BlockType.LOOP,
                        text: translate({id: 'block.repeatUntilReach'}),
                        branchCount: 1,
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            TOLERANCE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            },
                        },
                        tooltip: translate({id: 'block.repeatUntilReach.tooltip'})
                    },
                    {
                        opcode: 'repeatUntilFacing',
                        blockType: BlockType.LOOP,
                        text: translate({id: 'block.repeatUntilFacing'}),
                        branchCount: 1,
                        arguments: {
                            DIRECTION: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            },
                            TOLERANCE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            },
                        },
                        tooltip: translate({id: 'block.repeatUntilFacing.tooltip'})
                    },
                    '---',
                    // Polar Coordinates Category
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.polar'})
                    },
                    {
                        opcode: 'movePolar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.movePolar'}),
                        arguments: {
                            DISTANCE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.movePolar.tooltip'})
                    },
                    {
                        opcode: 'goToPolar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.goToPolar'}),
                        arguments: {
                            RADIUS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.goToPolar.tooltip'})
                    },
                    {
                        opcode: 'polarToXY',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.polarToXY'}),
                        arguments: {
                            RADIUS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.polarToXY.tooltip'})
                    },
                    {
                        opcode: 'polarToYY',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.polarToYY'}),
                        arguments: {
                            RADIUS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.polarToYY.tooltip'})
                    },
                    {
                        opcode: 'getPolarRadius',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.getPolarRadius'}),
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.getPolarRadius.tooltip'})
                    },
                    {
                        opcode: 'getPolarAngle',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.getPolarAngle'}),
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.getPolarAngle.tooltip'})
                    },
                    '---',
                    {
                        opcode: 'thetaAngle',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.thetaAngle'}),
                        tooltip: translate({id: 'block.thetaAngle.tooltip'})
                    },
                    {
                        opcode: 'rLength',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.rLength'}),
                        tooltip: translate({id: 'block.rLength.tooltip'})
                    },
                    '---',

                    // Non-linear Motion Category
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.nonlinear'})
                    },
                    {
                        opcode: 'moveBezier',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveBezier'}),
                        arguments: {
                            ENDX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            ENDY: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            CTRLX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            },
                            CTRLY: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            T: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0.1
                            }
                        },
                        tooltip: translate({id: 'block.moveBezier.tooltip'})
                    },
                    {
                        opcode: 'moveArc',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveArc'}),
                        arguments: {
                            RADIUS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            },
                            DIRECTION: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'arcDirection',
                                defaultValue: 'clockwise'
                            }
                        },
                        tooltip: translate({id: 'block.moveArc.tooltip'})
                    },
                    {
                        opcode: 'moveSpiral',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveSpiral'}),
                        arguments: {
                            RADIUS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 30
                            },
                            EXPANSION: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1.1
                            }
                        },
                        tooltip: translate({id: 'block.moveSpiral.tooltip'})
                    },
                    {
                        opcode: 'moveEllipse',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveEllipse'}),
                        arguments: {
                            A: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            B: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 30
                            }
                        },
                        tooltip: translate({id: 'block.moveEllipse.tooltip'})
                    },
                    '---',

                    // Advanced Motion
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.advanced'})
                    },
                    {
                        opcode: 'moveOrbit',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveOrbit'}),
                        arguments: {
                            CX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            CY: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            RADIUS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 10
                            }
                        },
                        tooltip: translate({id: 'block.moveOrbit.tooltip'})
                    },
                    {
                        opcode: 'moveWave',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveWave'}),
                        arguments: {
                            AMP: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            },
                            FREQ: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0.1
                            },
                            PHASE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.moveWave.tooltip'})
                    },
                    {
                        opcode: 'moveLissajous',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveLissajous'}),
                        arguments: {
                            A: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            B: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            DELTA: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            T: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        },
                        tooltip: translate({id: 'block.moveLissajous.tooltip'})
                    },
                    '---',
                    {
                        opcode: 'customMotion',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.customMotion'}),
                        isEdgeActivated: false,
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'motion1'
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                        },
                        tooltip: translate({id: 'block.customMotion.tooltip'})
                    },
                    {
                        opcode: 'whenCustomMotion',
                        blockType: BlockType.HAT,
                        text: translate({id: 'block.whenCustomMotion'}),
                        isEdgeActivated: false,
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'motion1'
                            }
                        },
                        tooltip: translate({id: 'block.whenCustomMotion.tooltip'})
                    },
                    {
                        opcode: 'customMotionX',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.customMotionX'}),
                        tooltip: translate({id: 'block.customMotionX.tooltip'})
                    },
                    {
                        opcode: 'customMotionY',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.customMotionY'}),
                        tooltip: translate({id: 'block.customMotionY.tooltip'})
                    },
                    {
                        opcode: 'customMotionExtraArgs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.customMotionExtraArgs'}),
                        tooltip: translate({id: 'block.customMotionExtraArgs.tooltip'})
                    },
                    '---',

                    // Utility Blocks
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.utility'})
                    },
                    {
                        opcode: 'degreesToRadians',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.degreesToRadians'}),
                        arguments: {
                            DEG: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.degreesToRadians.tooltip'})
                    },
                    {
                        opcode: 'radiansToDegrees',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.radiansToDegrees'}),
                        arguments: {
                            RAD: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: Math.PI / 2
                            }
                        },
                        tooltip: translate({id: 'block.radiansToDegrees.tooltip'})
                    },
                    {
                        opcode: 'normalizeAngle',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.normalizeAngle'}),
                        arguments: {
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 450
                            }
                        },
                        tooltip: translate({id: 'block.normalizeAngle.tooltip'})
                    },
                    {
                        opcode: 'distanceToPoint',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.distanceToPoint'}),
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.distanceToPoint.tooltip'})
                    },
                    {
                        opcode: 'angleToPoint',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.angleToPoint'}),
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.angleToPoint.tooltip'})
                    },
                    
                    // 坐标系有 bug , 暂时不用
                    // '---',
                    // // Integration with Vector and Coordinate extensions
                    // {
                    //     blockType: Scratch.BlockType.LABEL,
                    //     text: translate({id: 'label.integration'})
                    // },
                    // {
                    //     opcode: 'setCoordinateSystem',
                    //     blockType: Scratch.BlockType.COMMAND,
                    //     text: translate({id: 'block.setCoordinateSystem'}),
                    //     arguments: {
                    //         COORD_SYS: {
                    //             type: Scratch.ArgumentType.STRING,
                    //             defaultValue: '{}'
                    //         }
                    //     }
                    // },
                    // {
                    //     opcode: 'resetCoordinateSystem',
                    //     blockType: Scratch.BlockType.COMMAND,
                    //     text: translate({id: 'block.resetCoordinateSystem'})
                    // },


                    '---',
                    // Group Category
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.group'})
                    },
                    {
                        opcode: 'createGroup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.createGroup'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            }
                        },
                        tooltip: translate({id: 'block.createGroup.tooltip'})
                    },
                    {
                        opcode: 'addToGroup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.addToGroup'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            SPRITE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'spriteMenu',
                            }
                        },
                        tooltip: translate({id: 'block.addToGroup.tooltip'})
                    },
                    {
                        opcode: 'removeFromGroup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.removeFromGroup'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            SPRITE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'spriteMenu',
                            }
                        },
                        tooltip: translate({id: 'block.removeFromGroup.tooltip'})
                    },
                    {
                        opcode: 'getGroupMembers',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.getGroupMembers'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            }
                        },
                        tooltip: translate({id: 'block.getGroupMembers.tooltip'})
                    },
                    {
                        opcode: 'getSpriteGroup',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.getSpriteGroup'}),
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'groupMenu',
                                defaultValue: ''
                            }
                        },
                        tooltip: translate({id: 'block.getSpriteGroup.tooltip'})
                    },
                    {
                        opcode: 'batchAddToGroup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.batchAddToGroup'}),
                        arguments: {
                            SPRITES: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[]'
                            },
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            }
                        },
                        tooltip: translate({id: 'block.batchAddToGroup.tooltip'})
                    },
                    '---',
                    {
                        opcode: 'setGroupCenter',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.setGroupCenter'}),
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.setGroupCenter.tooltip'})
                    },
                    {
                        opcode: 'rotateGroupRight',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.rotateGroupRight'}),
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 15
                            },
                            RIGHTICON: {
                                type: Scratch.ArgumentType.IMAGE,
                                dataURI: turnrighticon
                            }
                        },
                        tooltip: translate({id: 'block.rotateGroupRight.tooltip'})
                    },
                    {
                        opcode: 'rotateGroupLeft',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.rotateGroupLeft'}),
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 15
                            },
                            LEFTICON: {
                                type: Scratch.ArgumentType.IMAGE,
                                dataURI: turnlefticon
                            }
                        },
                        tooltip: translate({id: 'block.rotateGroupLeft.tooltip'})
                    },
                    {
                        opcode: 'pointGroupDirection',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.pointGroupDirection'}),
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.pointGroupDirection.tooltip'})
                    },
                    {
                        opcode: 'pointGroupTowards',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.pointGroupTowards'}),
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            TARGET: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'spritesAndMouseMenu',
                                defaultValue: '_mouse_'
                            }
                        },
                        tooltip: translate({id: 'block.pointGroupTowards.tooltip'})
                    },
                    {
                        opcode: 'moveGroupByVector',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveGroupByVector'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.moveGroup.tooltip'})
                    },
                    {
                        opcode: 'goToGroupVector',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.goToGroupVector'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            VECTOR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[0,0]'
                            }
                        },
                        tooltip: translate({id: 'block.goToGroupPosition.tooltip'})
                    },
                    {
                        opcode: 'moveGroupPolar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveGroupPolar'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            DISTANCE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.moveGroup.tooltip'})
                    },
                    {
                        opcode: 'goToGroupPolar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.goToGroupPolar'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            RADIUS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            ANGLE: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.goToGroupPosition.tooltip'})
                    },
                    {
                        opcode: 'goToGroupPosition',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.goToGroupPosition'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.goToGroupPosition.tooltip'})
                    },
                    '---',
                    // Motion Path Category
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.motionpath'})
                    },
                    {
                        blockType: BlockType.BUTTON,
                        text: translate({id: 'pathEditor'}),
                        func: 'docs2'
                    },
                    {
                        opcode: 'createMotionPath',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.createMotionPath'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path1'
                            },
                            SPEED: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            },
                            POINTS: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[[0,0],[100,0],[100,100]]'
                            }
                        },
                        tooltip: translate({id: 'block.createMotionPath.tooltip'})
                    },
                    {
                        opcode: 'createMotionPathFromArray',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.createMotionPathFromArray'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path1'
                            },
                            SPEED: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            },
                            ARRAY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[[0,0],[100,0],[100,100],[0,100]]'
                            }
                        },
                        tooltip: translate({id: 'block.createMotionPathFromArray.tooltip'})
                    },
                    {
                        opcode: 'getMotionPathPoints',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.getMotionPathPoints'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path1'
                            },
                            PROP: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'motionPathPropMenu',
                                defaultValue: 'points'
                            }
                        },
                        tooltip: translate({id: 'block.getMotionPathPoints.tooltip'})
                    },
                    {
                        opcode: 'moveAlongPath',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.moveAlongPath'}),
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path1'
                            }
                        },
                        tooltip: translate({id: 'block.moveAlongPath.tooltip'})
                    },
                    {
                        opcode: 'setMotionPathFrame',
                        blockType: Scratch.BlockType.COMMAND,
                        text: translate({id: 'block.setMotionPathFrame'}),
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path1'
                            },
                            N: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.setMotionPathFrame.tooltip'})
                    },
                    {
                        opcode: 'getMotionPathFrame',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.getMotionPathFrame'}),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path1'
                            }
                        },
                        tooltip: translate({id: 'block.getMotionPathFrame.tooltip'})
                    },
                    {
                        opcode: 'generateTrajectory',
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate({id: 'block.generateTrajectory'}),
                        tooltip: translate({id: 'block.generateTrajectory.tooltip'}),
                        arguments: {
                            EXPRESSION: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'x^2'
                            },
                            X_START: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -10
                            },
                            X_END: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            },
                            STEP: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    '---',
                    // Utility Blocks
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.setting'})
                    },
                    {
                        opcode: 'setMoveListen',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '⚙️ ' + translate({id: 'block.setMoveListen'}),
                        color1: '#909090',
                        color2: '#606060',
                        arguments: {
                            SPRITE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'spriteMenu',
                            },
                            LISTEN: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'listenState',
                                defaultValue: 'listening'
                            }
                        },
                        tooltip: translate({id: 'block.setMoveListen.tooltip'})
                    },
                    {
                        opcode: 'isMoveListen',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '⚙️ ' + translate({id: 'block.isMoveListen'}),
                        color1: '#909090',
                        color2: '#606060',
                        arguments: {
                            SPRITE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'spriteMenu',
                            }
                        },
                        tooltip: translate({id: 'block.isMoveListen.tooltip'})
                    },
                    {
                        opcode: 'setGroupMoveListen',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '⚙️ ' + translate({id: 'block.setGroupMoveListen'}),
                        color1: '#909090',
                        color2: '#606060',
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            LISTEN: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'listenState',
                                defaultValue: 'listening'
                            }
                        },
                        tooltip: translate({id: 'block.setGroupMoveListen.tooltip'})
                    },
                    {
                        opcode: 'isGroupMoveListen',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '⚙️ ' + translate({id: 'block.isGroupMoveListen'}),
                        color1: '#909090',
                        color2: '#606060',
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            }
                        },
                        tooltip: translate({id: 'block.isGroupMoveListen.tooltip'})
                    },
                    '---',
                    // Performance Optimization
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate({id: 'label.performance'})
                    },
                    {
                        opcode: 'cacheRadian',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '⚡ ' + translate({id: 'block.cacheRadian'}),
                        color1: '#CF63CF',
                        color2: '#C94FC9',
                        arguments: {
                            ANGLE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.cacheRadian.tooltip'})
                    },
                    {
                        opcode: 'getCachedRadian',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '⚡ ' + translate({id: 'block.getCachedRadian'}),
                        color1: '#CF63CF',
                        color2: '#C94FC9',
                        arguments: {
                            ANGLE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 90
                            }
                        },
                        tooltip: translate({id: 'block.getCachedRadian.tooltip'})
                    },
                    {
                        opcode: 'setCalcCache',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '⚡ ' + translate({id: 'block.setCalcCache'}),
                        color1: '#CF63CF',
                        color2: '#C94FC9',
                        arguments: {
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'myValue'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.setCalcCache.tooltip'})
                    },
                    {
                        opcode: 'getCalcCache',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '⚡ ' + translate({id: 'block.getCalcCache'}),
                        color1: '#CF63CF',
                        color2: '#C94FC9',
                        arguments: {
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'myValue'
                            }
                        },
                        tooltip: translate({id: 'block.getCalcCache.tooltip'})
                    },
                    {
                        opcode: 'clearCaches',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '⚡ ' + translate({id: 'block.clearCaches'}),
                        color1: '#CF63CF',
                        color2: '#C94FC9',
                        tooltip: translate({id: 'block.clearCaches.tooltip'})
                    },
                    {
                        opcode: 'batchMoveGroup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '⚡ ' + translate({id: 'block.batchMoveGroup'}),
                        color1: '#CF63CF',
                        color2: '#C94FC9',
                        arguments: {
                            GROUP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'group1'
                            },
                            DX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            },
                            DY: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        tooltip: translate({id: 'block.batchMoveGroup.tooltip'})
                    },
    ];

    
    // 需要角色才能使用的积木opcode列表
    const SPRITE_ONLY_OPCODES = [
        'repeatUntilReach', 'repeatUntilFacing', 'movePolar', 'goToPolar', 'moveBezier', 'moveArc', 'moveSpiral',
        'moveEllipse', 'moveOrbit', 'moveWave', 'moveLissajous', 
        'thetaAngle', 'rLength', 'goToVector', 'moveByVector',
        'movedFromX', 'movedFromY', 'movedToX', 'movedToY',
        'whenMoved', 'createWaypoint', 'whenOnWaypoint',
        'customMotion', 'whenCustomMotion',
        'lastWaypointName', 'customMotionX', 'customMotionY', 'customMotionExtraArgs',
        'getMotionProperty', 'isOnWaypoint'
    ];

    // 需要角色才能显示的板块标签
    const SPRITE_ONLY_LABELS = ['移动', 'Motion', '非线性运动', 'Non-linear Motion', '高级运动', 'Advanced Motion'];
    // 需要背景才能显示的板块标签
    const STAGE_ONLY_LABELS = ['选中了舞台: 不可使用运动类积木', 'Selected stage: Cannot use motion blocks'];


    class MoreMotion {
        constructor(runtime) {
            this.runtime = runtime;
            this.currentCoordSystem = null;
            this._waypoints = {}; // Store waypoints: {name: {x, y, tolerance}}
            this._stopCustomMotion = {};
            this._lastPositions = {}; // Store last positions for detecting movement
            this._groups = {}; // Store groups: {groupName: [spriteName1, spriteName2, ...]}
            this._lastWaypointName = ''; // Last reached waypoint name
            this._lastCustomMotionData = null; // Last custom motion data
            this._groupVisibility = {}; // Store group visibility: {groupName: true/false}
            this._groupCenters = {}; // Store group centers: {groupName: {x, y}}
            this._motionPaths = {}; // Store motion paths: {pathName: {speed, points: [{x, y}, ...]}}
            this._radianCache = {}; // 弧度转换缓存: { degree: radian }
            this._calcCache = {}; // 通用计算缓存: { key: value }
            this._batchMode = false; // 批量移动模式
            this._batchOffsets = []; // 批量移动偏移队列
            this._initialized = false;
        }

        _ensureInitialized() {
            if (this._initialized) return;
            // 确保 runtime 可用
            if (!this.runtime) {
                this.runtime = Scratch.runtime || (Scratch.vm && Scratch.vm.runtime);
            }
            if (!this.runtime) return;
            this._initialized = true;
            try {
                this._hookSetXY();
            } catch (e) {
                console.warn('MoreMotion: _hookSetXY failed', e);
            }
            this._startPositionChecker();
        }
        
        _startPositionChecker() {
            const self = this;
            // Check every 100ms
            setInterval(() => {
                if (!self._waypoints || Object.keys(self._waypoints).length === 0) return;
                
                const targets = self.runtime.targets;
                if (!targets) return;
                
                targets.forEach(target => {
                    if (target.isStage) return;
                    
                    const lastPos = self._lastPositions[target.id];
                    const currentPos = { x: target.x, y: target.y };
                    
                    if (!lastPos || lastPos.x !== currentPos.x || lastPos.y !== currentPos.y) {
                        // Position changed, check waypoints
                        self._checkWaypoints(target);
                        self._lastPositions[target.id] = currentPos;
                    }
                });
            }, 100);
        }
        
        _checkWaypoints(target) {
            const self = this;
            if (!self._waypoints || !self.runtime) return;
            
            for (const [waypointName, waypoint] of Object.entries(self._waypoints)) {
                const dist = Math.sqrt(
                    Math.pow(target.x - waypoint.x, 2) + 
                    Math.pow(target.y - waypoint.y, 2)
                );
                const tolerance = waypoint.tolerance || 0;
                if (dist <= tolerance) {
                    target._onWaypoint = true;
                    self._lastWaypointName = waypointName;
                    self.runtime.startHats(`${EXTENSION_ID}_whenOnWaypoint`);
                }
            }
        }

        _patchScratchBlocks() {
            // No additional patching needed for TurboWarp
        }

        _hookSetXY() {
            const self = this;
            const runtime = this.runtime;
            
            // Hook 所有已有角色（非舞台）的 setXY
            runtime.targets.forEach(target => {
                if (!target.isStage) {
                    self._patchTarget(target);
                }
            });
            
            // Hook addTarget 监听新创建的角色
            if (runtime.addTarget) {
                const origAddTarget = runtime.addTarget.bind(runtime);
                runtime.addTarget = function(target) {
                    if (!target.isStage) {
                        self._patchTarget(target);
                    }
                    return origAddTarget(target);
                };
            }
        }

        _patchTarget(target) {
            if (target._setXYPatched) return;
            target._setXYPatched = true;
            
            // Initialize move listen state on target (default is true)
            if (target._moveListenState === undefined) {
                target._moveListenState = true;
            }
            
            const self = this;  // Save reference to MoreMotion instance
            const origSetXY = target.setXY;
            
            target.setXY = function(x, y, force) {
                const targetObj = this;  // Save reference to target
                const oldX = targetObj.x;
                const oldY = targetObj.y;
                
                // Call original setXY with correct context
                origSetXY.call(targetObj, x, y, force);
                
                // 坐标改变时触发 hat 积木（检查监听状态）
                if (oldX !== targetObj.x || oldY !== targetObj.y) {
                    // Check if move listening is enabled for this target (default is true)
                    const isListening = targetObj._moveListenState !== false;
                    
                    if (isListening) {
                        const moveInfo = {
                            fromX: oldX,
                            fromY: oldY,
                            toX: targetObj.x,
                            toY: targetObj.y
                        };
                        // Store on target directly
                        targetObj._lastMoveInfo = moveInfo;
                        
                        // Store last position for speed calculation
                        targetObj._lastPosition = { x: oldX, y: oldY };
                        
                        // Trigger hat block with parameters
                        if (self && self.runtime) {
                            self.runtime.startHats(`${EXTENSION_ID}_whenMoved`);
                        }
                        
                        // Check if reached any waypoint
                        if (self && self._waypoints) {
                            for (const [waypointName, waypoint] of Object.entries(self._waypoints)) {
                                // Check if target is at waypoint (within waypoint's tolerance)
                                const dist = Math.sqrt(
                                    Math.pow(targetObj.x - waypoint.x, 2) + 
                                    Math.pow(targetObj.y - waypoint.y, 2)
                                );
                                const tolerance = waypoint.tolerance || 0;
                                if (dist <= tolerance) {
                                    // Set flag on target
                                    targetObj._onWaypoint = true;
                                    self._lastWaypointName = waypointName;
                    self.runtime.startHats(`${EXTENSION_ID}_whenOnWaypoint`);
                                }
                            }
                        }
                    } else {
                        // Clear move info if not listening
                        delete targetObj._lastMoveInfo;
                    }
                }
            };
        }

        _isStage() {
            if (!this.runtime) return false;
            const target = this.runtime.getEditingTarget ? this.runtime.getEditingTarget() : null;
            return target ? target.isStage : false;
        }

        _getFilteredBlocks() {
            if (this._isStage()) {
                // 舞台只显示工具类积木
                return EXTENSION_BLOCKS.filter(block => {
                    // 隐藏角色专用积木
                    if (block.opcode && SPRITE_ONLY_OPCODES.includes(block.opcode)) {
                        return false;
                    }

                    // 隐藏角色专用板块标签
                    if (block.blockType === Scratch.BlockType.LABEL && SPRITE_ONLY_LABELS.includes(block.text)) {
                        return false;
                    }
                    return true;
                });
            }
            return EXTENSION_BLOCKS.filter(block => {
                // 隐藏角色专用板块标签
                if (block.blockType === Scratch.BlockType.LABEL && STAGE_ONLY_LABELS.includes(block.text)) {
                    return false;
                }
                return true;
            });
        }

        getInfo() {
            this._ensureInitialized();
            return {
                id: EXTENSION_ID,
                name: translate({id: 'extensionName'}),
                color1: '#4c97ff',
                color2: '#3373cc',
                color3: '#3373cc',
                menuIconURI: EXTENSION_ICON,
                blockIconURI: EXTENSION_ICON,
                blocks: this._getFilteredBlocks(),
                menus: {
                    arcDirection: {
                        items: [
                            { text: translate({id: 'menu.clockwise'}), value: 'clockwise' },
                            { text: translate({id: 'menu.counterClockwise'}), value: 'counter-clockwise' }
                        ]
                    },
                    listenState: {
                        items: [
                            { text: translate({id: 'menu.listening'}), value: 'listening' },
                            { text: translate({id: 'menu.notListening'}), value: 'not-listening' }
                        ]
                    },
                    spriteMenu: {
                        acceptReporters: true,
                        items: 'getSprites'
                    },
                    motionProperty: {
                        items: [
                            { text: translate({id: 'menu.x'}), value: 'x' },
                            { text: translate({id: 'menu.y'}), value: 'y' },
                            { text: translate({id: 'menu.direction'}), value: 'direction' },
                            { text: translate({id: 'menu.positionVector'}), value: 'positionVector' },
                            { text: translate({id: 'menu.positionVectorPolar'}), value: 'positionVectorPolar' },
                            { text: translate({id: 'menu.velocityVector'}), value: 'velocityVector' },
                            { text: translate({id: 'menu.velocityVectorPolar'}), value: 'velocityVectorPolar' },
                            { text: translate({id: 'menu.speed'}), value: 'speed' },
                        ]
                    },
                    waypointProperty: {
                        items: [
                            { text: translate({id: 'menu.x'}), value: 'x' },
                            { text: translate({id: 'menu.y'}), value: 'y' },
                            { text: translate({id: 'menu.tolerance'}), value: 'tolerance' }
                        ]
                    },
                    waypointMenu: {
                        acceptReporters: true,
                        items: 'getWaypoints'
                    },
                    waypointMenu2: {
                        items: 'getWaypoints'
                    },
                    groupMenu: {
                        acceptReporters: true,
                        items: 'getSpritesGroup'
                    },
                    spritesGroupMenu: {
                        acceptReporters: true,
                        items: 'getSpritesGroup'
                    },
                    spritesAndMouseMenu: {
                        acceptReporters: true,
                        items: 'getMouseAndSprites'
                    },
                    motionPathPropMenu: {
                        items: [
                            { text: translate({id: 'menu.motionPathProp.points'}), value: 'points' },
                            { text: translate({id: 'menu.motionPathProp.speed'}), value: 'speed' }
                        ]
                    },
                }
            };
        }

        // Get the target (sprite) to move
        _getTarget(util) {
            return util.target;
        }

        _scrAngleToJsAngle(angle) {
            if (this._radianCache[angle] !== undefined) return this._radianCache[angle];
            const rad = (90 - angle) * Math.PI / 180;
            this._radianCache[angle] = rad;
            return rad;
        }

        // 动态菜单
        // 角色
        getSprites() {
            const targets = this.runtime.targets;
            const sprites = [];
            
            // Add all sprites (excluding stage)
            for (const target of targets) {
                if (!target.isStage && target.sprite) {
                    sprites.push({
                        text: target.sprite.name,
                        value: target.sprite.name
                    });
                }
            }
            
            // Add special options
            sprites.unshift({
                text: translate({id: 'menu.myself'}),
                value: '_myself_'
            });
            
            return sprites;
        }

        getMouseAndSprites() {
            const targets = this.runtime.targets;
            const sprites = [];
            
            // Add all sprites (excluding stage)
            for (const target of targets) {
                if (!target.isStage && target.sprite) {
                    sprites.push({
                        text: target.sprite.name,
                        value: target.sprite.name
                    });
                }
            }
            
            // Add special options
            sprites.unshift({
                text: translate({id: 'menu.mousepoint'}),
                value: '_mouse_'
            });
            
            return sprites;
        }

        // 获取所有运动轨迹
        getMotionPaths() {
            const paths = [];
            
            // Add all existing motion paths
            for (const name in this._motionPaths) {
                paths.push({
                    text: name,
                    value: name
                });
            }
            
            return paths;
        }

        // ========== Motion Path ==========

        createMotionPath(args, util) {
            const pathName = Cast.toString(args.NAME);
            const speed = Cast.toNumber(args.SPEED);
            const pointsStr = Cast.toString(args.POINTS);
            
            // Parse points from JSON string
            let points = [];
            try {
                const parsed = JSON.parse(pointsStr);
                if (Array.isArray(parsed)) {
                    if (Array.isArray(parsed[0])) {
                        // Format: [[x1,y1],[x2,y2],...]
                        points = parsed.map(p => ({
                            x: Cast.toNumber(p[0]),
                            y: Cast.toNumber(p[1])
                        }));
                    } else {
                        // Flat format: [x1,y1,x2,y2,...]
                        for (let i = 0; i < parsed.length - 1; i += 2) {
                            points.push({
                                x: Cast.toNumber(parsed[i]),
                                y: Cast.toNumber(parsed[i + 1])
                            });
                        }
                    }
                }
            } catch (e) {
                points = [];
            }
            
            // Create or update path
            this._motionPaths[pathName] = {
                speed,
                points
            };
        }

        createMotionPathFromArray(args, util) {
            const pathName = Cast.toString(args.NAME);
            const speed = Cast.toNumber(args.SPEED);
            const arrayStr = Cast.toString(args.ARRAY);
            
            let points = [];
            try {
                const parsed = JSON.parse(arrayStr);
                if (Array.isArray(parsed)) {
                    if (Array.isArray(parsed[0])) {
                        // Format: [[x1,y1],[x2,y2],...]
                        points = parsed.map(p => ({
                            x: Cast.toNumber(p[0]),
                            y: Cast.toNumber(p[1])
                        }));
                    } else {
                        // Flat format: [x1,y1,x2,y2,...]
                        for (let i = 0; i < parsed.length - 1; i += 2) {
                            points.push({
                                x: Cast.toNumber(parsed[i]),
                                y: Cast.toNumber(parsed[i + 1])
                            });
                        }
                    }
                }
            } catch (e) {
                console.warn('Failed to parse position array:', e);
                return;
            }
            
            if (points.length < 2) {
                console.warn('Position array must contain at least 2 points');
                return;
            }
            
            this._motionPaths[pathName] = {
                speed,
                points
            };
        }

        getMotionPathPoints(args) {
            const pathName = Cast.toString(args.NAME);
            const prop = Cast.toString(args.PROP);
            
            if (!this._motionPaths[pathName]) {
                return prop === 'speed' ? '0' : '[]';
            }
            
            const path = this._motionPaths[pathName];
            if (prop === 'speed') {
                return String(path.speed);
            }
            // 默认返回位置数组
            const points = path.points;
            return JSON.stringify(points.map(p => [p.x, p.y]));
        }

        moveAlongPath(args, util) {
            const pathName = Cast.toString(args.PATH);
            
            if (!this._motionPaths[pathName]) return;
            
            const path = this._motionPaths[pathName];
            const target = util.target;
            
            if (!target) return;
            
            // Initialize path progress if not exists
            if (!target._pathProgress) {
                target._pathProgress = {};
            }
            
            if (!target._pathProgress[pathName]) {
                target._pathProgress[pathName] = {
                    currentPointIndex: 0,
                    progress: 0 // 0 to 1 between current and next point
                };
            }
            
            const progress = target._pathProgress[pathName];
            const points = path.points;
            
            if (points.length < 2) return;
            
            // Check if reached the end
            if (progress.currentPointIndex >= points.length - 1) {
                // Reset to start for looping
                progress.currentPointIndex = 0;
                progress.progress = 0;
            }
            
            const currentPoint = points[progress.currentPointIndex];
            const nextPoint = points[progress.currentPointIndex + 1];
            
            // Calculate distance between current and next point
            const dx = nextPoint.x - currentPoint.x;
            const dy = nextPoint.y - currentPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance === 0) {
                progress.currentPointIndex++;
                progress.progress = 0;
                return;
            }
            
            // Calculate how much to move this frame
            const moveAmount = path.speed / distance;
            progress.progress += moveAmount;
            
            if (progress.progress >= 1) {
                // Reached next point
                progress.currentPointIndex++;
                progress.progress = 0;
                
                // Set position to the point
                target.setXY(nextPoint.x, nextPoint.y);
            } else {
                // Interpolate position
                const x = currentPoint.x + dx * progress.progress;
                const y = currentPoint.y + dy * progress.progress;
                target.setXY(x, y);
                
                // Update direction to face movement direction
                const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
                target.setDirection(angle);
            }
        }

        setMotionPathFrame(args, util) {
            const pathName = Cast.toString(args.PATH);
            const frame = Cast.toNumber(args.N);
            const target = util.target;
            
            if (!target || !this._motionPaths[pathName]) return;
            
            if (!target._pathProgress) {
                target._pathProgress = {};
            }
            
            const points = this._motionPaths[pathName].points;
            const maxFrame = Math.max(0, points.length - 2);
            const clampedFrame = Math.max(0, Math.min(Math.floor(frame), maxFrame));
            
            target._pathProgress[pathName] = {
                currentPointIndex: clampedFrame,
                progress: 0
            };
        }

        getMotionPathFrame(args, util) {
            const pathName = Cast.toString(args.NAME);
            const target = util.target;
            
            if (!target || !this._motionPaths[pathName]) return 0;
            
            if (!target._pathProgress || !target._pathProgress[pathName]) return 0;
            
            return target._pathProgress[pathName].currentPointIndex;
        }

        // ---- 性能优化工具 ----
        cacheRadian(args) {
            const angle = Cast.toNumber(args.ANGLE);
            this._scrAngleToJsAngle(angle); // 调用已带缓存的方法
        }

        getCachedRadian(args) {
            const angle = Cast.toNumber(args.ANGLE);
            return this._scrAngleToJsAngle(angle);
        }

        setCalcCache(args) {
            const key = Cast.toString(args.KEY);
            const value = Cast.toNumber(args.VALUE);
            this._calcCache[key] = value;
        }

        getCalcCache(args) {
            const key = Cast.toString(args.KEY);
            return this._calcCache[key] !== undefined ? this._calcCache[key] : 0;
        }

        clearCaches() {
            this._radianCache = {};
            this._calcCache = {};
        }

        batchMoveGroup(args, util) {
            const groupName = Cast.toString(args.GROUP);
            const dx = Cast.toNumber(args.DX);
            const dy = Cast.toNumber(args.DY);

            if (!this._groups[groupName]) return;

            // 一次性计算并批量移动所有组成员
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setXY(target.x + dx, target.y + dy);
                }
            });
        }

        // ---- 表达式解析器（用于轨迹生成） ----
        _tokenizeMathExpr(expr) {
            const tokens = [];
            let i = 0;
            const s = expr.replace(/\s/g, '');
            while (i < s.length) {
                const ch = s[i];
                if (/[0-9]/.test(ch) || (ch === '.' && i + 1 < s.length && /[0-9]/.test(s[i + 1]))) {
                    let num = '';
                    while (i < s.length && /[0-9]/.test(s[i])) num += s[i++];
                    if (i < s.length && s[i] === '.') { num += s[i++]; while (i < s.length && /[0-9]/.test(s[i])) num += s[i++]; }
                    tokens.push({ type: 'num', value: parseFloat(num) });
                } else if (/[a-zA-Z_]/.test(ch)) {
                    let id = '';
                    while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) id += s[i++];
                    tokens.push({ type: 'id', value: id });
                } else if ('+-*/^(),'.includes(ch)) {
                    tokens.push({ type: 'op', value: ch }); i++;
                } else {
                    throw new Error('Unexpected character: ' + ch);
                }
            }
            return tokens;
        }

        _parseMathExpr(tokens, vars) {
            let pos = 0;
            const mathFuncs = {
                sin: Math.sin, cos: Math.cos, tan: Math.tan,
                asin: Math.asin, acos: Math.acos, atan: Math.atan,
                sqrt: Math.sqrt, abs: Math.abs,
                log: Math.log10, ln: Math.log, exp: Math.exp,
                floor: Math.floor, ceil: Math.ceil, round: Math.round,
                max: Math.max, min: Math.min,
                pow: Math.pow
            };
            const constants = { pi: Math.PI, e: Math.E };

            function peek() { return pos < tokens.length ? tokens[pos] : null; }
            function consume() { return tokens[pos++]; }

            function parseAddSub() {
                let left = parseMulDiv();
                while (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
                    const op = consume().value;
                    const right = parseMulDiv();
                    left = op === '+' ? left + right : left - right;
                }
                return left;
            }

            function parseMulDiv() {
                let left = parseUnary();
                while (peek() && peek().type === 'op' && (peek().value === '*' || peek().value === '/')) {
                    const op = consume().value;
                    const right = parseUnary();
                    left = op === '*' ? left * right : left / right;
                }
                return left;
            }

            function parseUnary() {
                if (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
                    const op = consume().value;
                    const val = parsePower();
                    return op === '-' ? -val : val;
                }
                return parsePower();
            }

            function parsePower() {
                const base = parsePrimary();
                if (peek() && peek().type === 'op' && peek().value === '^') {
                    consume();
                    const exp = parseUnary();
                    return Math.pow(base, exp);
                }
                return base;
            }

            function parsePrimary() {
                const t = peek();
                if (!t) throw new Error('Unexpected end of expression');

                if (t.type === 'num') {
                    consume();
                    return t.value;
                }

                if (t.type === 'op' && t.value === '(') {
                    consume();
                    const val = parseAddSub();
                    if (!peek() || peek().value !== ')') throw new Error('Missing closing parenthesis');
                    consume();
                    return val;
                }

                if (t.type === 'id') {
                    const name = t.value;
                    consume();
                    // Function call
                    if (peek() && peek().type === 'op' && peek().value === '(') {
                        consume();
                        const args = [];
                        if (!(peek() && peek().type === 'op' && peek().value === ')')) {
                            args.push(parseAddSub());
                            while (peek() && peek().type === 'op' && peek().value === ',') {
                                consume();
                                args.push(parseAddSub());
                            }
                        }
                        if (!peek() || peek().value !== ')') throw new Error('Missing closing parenthesis for function');
                        consume();
                        const fn = mathFuncs[name.toLowerCase()];
                        if (!fn) throw new Error('Unknown function: ' + name);
                        return fn(...args);
                    }
                    // Constant
                    if (constants[name.toLowerCase()] !== undefined) {
                        return constants[name.toLowerCase()];
                    }
                    // Variable
                    if (vars && vars[name] !== undefined) {
                        return vars[name];
                    }
                    throw new Error('Unknown variable: ' + name);
                }

                throw new Error('Unexpected token: ' + JSON.stringify(t));
            }

            const result = parseAddSub();
            if (pos < tokens.length) throw new Error('Unexpected token at position ' + pos);
            return result;
        }

        _evalMathExpr(expr, vars) {
            try {
                const tokens = this._tokenizeMathExpr(expr);
                return { success: true, value: this._parseMathExpr(tokens, vars) };
            } catch (e) {
                return { success: false, error: e.message };
            }
        }

        generateTrajectory(args) {
            const expression = Cast.toString(args.EXPRESSION);
            const xStart = Cast.toNumber(args.X_START);
            const xEnd = Cast.toNumber(args.X_END);
            const step = Cast.toNumber(args.STEP);

            if (step <= 0) return 'Error: step must be > 0';
            if (xStart > xEnd) return 'Error: x_start must be <= x_end';

            const maxPoints = 10000;
            const points = [];
            let x = xStart;
            let count = 0;

            while (x <= xEnd + step * 0.0001 && count < maxPoints) {
                const roundedX = Math.round(x * 1e10) / 1e10;
                const result = this._evalMathExpr(expression, { x: roundedX });
                if (result.success) {
                    points.push([roundedX, result.value]);
                } else {
                    return 'Error at x=' + roundedX + ': ' + result.error;
                }
                x += step;
                count++;
            }

            return JSON.stringify(points);
        }

        // 角色分组
        getSpritesGroup() {
            const targets = this.runtime.targets;
            const groupsSet = new Set();
            const sprites = [];
            
            // Collect all unique group names (using // as separator)
            for (const target of targets) {
                if (!target.isStage && target.sprite && target.sprite.name.includes('//')) {
                    const groupName = target.sprite.name.split('//')[0];
                    groupsSet.add(groupName);
                }
            }
            
            // Convert to menu items
            groupsSet.forEach(groupName => {
                sprites.push({
                    text: groupName,
                    value: groupName
                });
            });
            
            // Add empty option at the beginning
            sprites.unshift({
                text: '(select group)',
                value: ''
            });
            
            return sprites;
        }

        // 获取指定组的所有角色
        getSpriteGroup(args, util) {
            const groupName = Cast.toString(args.GROUP);
            const targets = this.runtime.targets;
            const sprites = [];
            
            // Find all sprites in the specified group
            for (const target of targets) {
                if (!target.isStage && target.sprite && target.sprite.name.includes('//')) {
                    const parts = target.sprite.name.split('//');
                    if (parts[0] === groupName) {
                        sprites.push(target.sprite.name);
                    }
                }
            }
            
            return JSON.stringify(sprites);
        }

        // 批量增加角色到组
        batchAddToGroup(args, util) {
            const spritesStr = Cast.toString(args.SPRITES);
            const groupName = Cast.toString(args.GROUP);
            
            // Parse JSON array of sprite names
            let spriteList;
            try {
                spriteList = JSON.parse(spritesStr);
                if (!Array.isArray(spriteList)) {
                    spriteList = [spritesStr];
                }
            } catch (e) {
                // If not valid JSON, treat as single sprite name
                spriteList = [spritesStr];
            }
            
            // Initialize group if not exists
            if (!this._groups[groupName]) {
                this._groups[groupName] = [];
            }
            
            // Add each sprite to the group
            spriteList.forEach(spriteName => {
                if (spriteName && !this._groups[groupName].includes(spriteName)) {
                    this._groups[groupName].push(spriteName);
                }
            });
        }

        // ========== Group Move Listen ==========

        setGroupMoveListen(args, util) {
            const groupName = Cast.toString(args.GROUP);
            const listenState = Cast.toString(args.LISTEN);
            
            if (!this._groups[groupName]) return;
            
            // Set move listen state for all sprites in the group
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    if (!target._moveListenState) {
                        target._moveListenState = {};
                    }
                    target._moveListenState[groupName] = (listenState === 'listening');
                }
            });
        }

        isGroupMoveListen(args, util) {
            const groupName = Cast.toString(args.GROUP);
            
            if (!this._groups[groupName]) return false;
            
            // Check if any sprite in the group is listening
            return this._groups[groupName].some(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target && target._moveListenState) {
                    return target._moveListenState[groupName] === true;
                }
                return false;
            });
        }

        // ========== Group Center ==========

        setGroupCenter(args, util) {
            const groupName = Cast.toString(args.GROUP);
            const centerX = Cast.toNumber(args.X);
            const centerY = Cast.toNumber(args.Y);
            
            if (!this._groups[groupName]) return;
            
            // Store center point for the group
            if (!this._groupCenters) {
                this._groupCenters = {};
            }
            this._groupCenters[groupName] = { x: centerX, y: centerY };
        }

        // ========== Group Rotation ==========

        rotateGroupRight(args, util) {
            const groupName = Cast.toString(args.GROUP);
            const angle = Cast.toNumber(args.ANGLE);
            
            if (!this._groups[groupName]) return;
            
            // Rotate all sprites in the group clockwise
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setDirection(target.direction + angle);
                }
            });
        }

        rotateGroupLeft(args, util) {
            const groupName = Cast.toString(args.GROUP);
            const angle = Cast.toNumber(args.ANGLE);
            
            if (!this._groups[groupName]) return;
            
            // Rotate all sprites in the group counter-clockwise
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setDirection(target.direction - angle);
                }
            });
        }

        pointGroupDirection(args, util) {
            const groupName = Cast.toString(args.GROUP);
            const direction = Cast.toNumber(args.ANGLE);
            
            if (!this._groups[groupName]) return;
            
            // Point all sprites in the group to direction
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setDirection(direction);
                }
            });
        }

        pointGroupTowards(args, util) {
            const groupName = Cast.toString(args.GROUP);
            const targetName = Cast.toString(args.TARGET);
            
            if (!this._groups[groupName]) return;
            
            // Get target position
            let targetX, targetY;
            if (targetName === '_mouse_') {
                const mouse = this.runtime.ioDevices.mouse;
                targetX = mouse._clientX;
                targetY = -mouse._clientY;
            } else {
                const targetSprite = this._getTargetByName(targetName);
                if (!targetSprite) return;
                targetX = targetSprite.x;
                targetY = targetSprite.y;
            }
            
            // Point all sprites towards target
            this._groups[groupName].forEach(spriteName => {
                const sprite = this._getTargetByName(spriteName);
                if (sprite) {
                    const dx = targetX - sprite.x;
                    const dy = targetY - sprite.y;
                    // Convert to Scratch angle (0=up, 90=right)
                    let angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
                    // Normalize to -180 to 180
                    while (angle > 180) angle -= 360;
                    while (angle <= -180) angle += 360;
                    sprite.setDirection(angle);
                }
            });
        }

        // ========== Group Motion ==========

        moveGroupByVector(args, util) {
            const groupName = Cast.toString(args.NAME);
            const dx = Cast.toNumber(args.X);
            const dy = Cast.toNumber(args.Y);
            
            if (!this._groups[groupName]) return;
            
            // Move all sprites in the group
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setXY(target.x + dx, target.y + dy);
                }
            });
        }

        goToGroupVector(args, util) {
            const groupName = Cast.toString(args.NAME);
            const vectorStr = Cast.toString(args.VECTOR);
            
            if (!this._groups[groupName]) return;
            
            // Parse vector
            let targetX, targetY;
            try {
                const vector = JSON.parse(vectorStr);
                if (Array.isArray(vector) && vector.length >= 2) {
                    targetX = vector[0];
                    targetY = vector[1];
                } else {
                    return;
                }
            } catch (e) {
                return;
            }
            
            // Calculate group center
            let centerX = 0;
            let centerY = 0;
            let count = 0;
            
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    centerX += target.x;
                    centerY += target.y;
                    count++;
                }
            });
            
            if (count === 0) return;
            
            centerX /= count;
            centerY /= count;
            
            // Calculate offset
            const offsetX = targetX - centerX;
            const offsetY = targetY - centerY;
            
            // Move all sprites
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setXY(target.x + offsetX, target.y + offsetY);
                }
            });
        }

        moveGroupPolar(args, util) {
            const groupName = Cast.toString(args.NAME);
            const distance = Cast.toNumber(args.DISTANCE);
            const angle = Cast.toNumber(args.ANGLE);
            const radians = this._scrAngleToJsAngle(angle);
            
            if (!this._groups[groupName]) return;
            
            const dx = distance * Math.cos(radians);
            const dy = distance * Math.sin(radians);
            
            // Move all sprites in the group
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setXY(target.x + dx, target.y + dy);
                }
            });
        }

        goToGroupPolar(args, util) {
            const groupName = Cast.toString(args.NAME);
            const radius = Cast.toNumber(args.RADIUS);
            const angle = Cast.toNumber(args.ANGLE);
            const radians = this._scrAngleToJsAngle(angle);
            
            if (!this._groups[groupName]) return;
            
            // Calculate target position from polar coordinates
            const targetX = radius * Math.cos(radians);
            const targetY = radius * Math.sin(radians);
            
            // Calculate group center
            let centerX = 0;
            let centerY = 0;
            let count = 0;
            
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    centerX += target.x;
                    centerY += target.y;
                    count++;
                }
            });
            
            if (count === 0) return;
            
            centerX /= count;
            centerY /= count;
            
            // Calculate offset
            const offsetX = targetX - centerX;
            const offsetY = targetY - centerY;
            
            // Move all sprites
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setXY(target.x + offsetX, target.y + offsetY);
                }
            });
        }

        // 路标
        getWaypoints() {
            const waypoints = [];
            
            // Add all existing waypoints
            for (const name in this._waypoints) {
                waypoints.push({
                    text: name,
                    value: name
                });
            }
            
            // If no waypoints, add a placeholder
            if (waypoints.length === 0) {
                waypoints.push({
                    text: '-',
                    value: ''
                });
            }
            
            return waypoints;
        }

        // =========== docs ===========
        docs() {
            let a = document.createElement('a');
            a.href = "https://learn.ccw.site/article/b27dda45-fec0-4cde-9961-c7343bce9a5c";
            a.rel = "noopener noreferrer";        
            a.target = "_blank";        
            a.click();
        }

        docs2() {
            let a = document.createElement('a');
            a.href = "https://tomlct2015.github.io/moreMotion/pathEditor";
            a.rel = "noopener noreferrer";        
            a.target = "_blank";        
            a.click();
        }

        // ========== Polar Coordinates ==========

        movePolar(args, util) {
            const distance = Cast.toNumber(args.DISTANCE);
            const angle = Cast.toNumber(args.ANGLE);
            const radians = this._scrAngleToJsAngle(angle);
            
            const target = this._getTarget(util);
            const dx = distance * Math.cos(radians);
            const dy = distance * Math.sin(radians);
            
            target.setXY(target.x + dx, target.y + dy);
        }

        goToPolar(args, util) {
            const radius = Cast.toNumber(args.RADIUS);
            const angle = Cast.toNumber(args.ANGLE);
            const radians = this._scrAngleToJsAngle(angle);
            
            const target = this._getTarget(util);
            const x = radius * Math.cos(radians);
            const y = radius * Math.sin(radians);
            
            target.setXY(x, y);
        }

        polarToXY(args) {
            const radius = Cast.toNumber(args.RADIUS);
            const angle = Cast.toNumber(args.ANGLE);
            const radians = this._scrAngleToJsAngle(angle);
            return radius * Math.cos(radians);
        }

        polarToYY(args) {
            const radius = Cast.toNumber(args.RADIUS);
            const angle = Cast.toNumber(args.ANGLE);
            const radians = this._scrAngleToJsAngle(angle);
            return radius * Math.sin(radians);
        }

        getPolarRadius(args) {
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            return Math.sqrt(x * x + y * y);
        }

        getPolarAngle(args) {
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            let angle = Math.atan2(y, x) * 180 / Math.PI - 90;
            return this._normalizeAngle(angle);
        }

        // ========== Non-linear Motion ==========

        moveBezier(args, util) {
            const endX = Cast.toNumber(args.ENDX);
            const endY = Cast.toNumber(args.ENDY);
            const ctrlX = Cast.toNumber(args.CTRLX);
            const ctrlY = Cast.toNumber(args.CTRLLY);
            const t = Cast.toNumber(args.T);
            
            const target = this._getTarget(util);
            const startX = target.x;
            const startY = target.y;
            
            // Quadratic Bezier curve
            const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
            const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;
            
            target.setXY(x, y);
        }

        moveArc(args, util) {
            const radius = Cast.toNumber(args.RADIUS);
            const angle = Cast.toNumber(args.ANGLE);
            const direction = Cast.toString(args.DIRECTION);
            
            const target = this._getTarget(util);
            const currentAngle = target.direction;
            const radians = this._scrAngleToJsAngle(currentAngle);
            
            const centerX = target.x - radius * Math.cos(radians);
            const centerY = target.y - radius * Math.sin(radians);
            
            const newAngle = direction === 'clockwise' ? currentAngle + angle : currentAngle - angle;
            const newRadians = this._scrAngleToJsAngle(newAngle);
            
            const x = centerX + radius * Math.cos(newRadians);
            const y = centerY + radius * Math.sin(newRadians);
            
            target.setXY(x, y);
            target.setDirection(newAngle);
        }

        moveSpiral(args, util) {
            const radius = Cast.toNumber(args.RADIUS);
            const angle = Cast.toNumber(args.ANGLE);
            const expansion = Cast.toNumber(args.EXPANSION);
            
            const target = this._getTarget(util);
            const currentAngle = target.direction;
            const newAngle = currentAngle + angle;
            const newRadius = radius * expansion;
            
            const radians = this._scrAngleToJsAngle(newAngle);
            const dx = newRadius * Math.cos(radians);
            const dy = newRadius * Math.sin(radians);
            
            target.setXY(target.x + dx, target.y + dy);
            target.setDirection(newAngle);
        }

        moveEllipse(args, util) {
            const a = Cast.toNumber(args.A);
            const b = Cast.toNumber(args.B);
            const angle = Cast.toNumber(args.ANGLE);
            
            const target = this._getTarget(util);
            const radians = this._scrAngleToJsAngle(angle);
            
            const x = a * Math.cos(radians);
            const y = b * Math.sin(radians);
            
            target.setXY(target.x + x, target.y + y);
        }

        // ========== Advanced Motion ==========

        moveOrbit(args, util) {
            const cx = Cast.toNumber(args.CX);
            const cy = Cast.toNumber(args.CY);
            const radius = Cast.toNumber(args.RADIUS);
            const angle = Cast.toNumber(args.ANGLE);
            
            const target = this._getTarget(util);
            const currentAngle = Math.atan2(target.y - cy, target.x - cx) * 180 / Math.PI - 90;
            const newAngle = currentAngle + angle;
            const radians = this._scrAngleToJsAngle(newAngle);
            
            const x = cx + radius * Math.cos(radians);
            const y = cy + radius * Math.sin(radians);
            
            target.setXY(x, y);
        }

        moveWave(args, util) {
            const amp = Cast.toNumber(args.AMP);
            const freq = Cast.toNumber(args.FREQ);
            const phase = Cast.toNumber(args.PHASE);
            
            const target = this._getTarget(util);
            const time = Date.now() / 1000;
            
            const y = amp * Math.sin(freq * time + phase);
            target.setXY(target.x + 1, target.y + y);
        }

        moveLissajous(args, util) {
            const a = Cast.toNumber(args.A);
            const b = Cast.toNumber(args.B);
            const delta = Cast.toNumber(args.DELTA) * Math.PI / 180;
            const t = Cast.toNumber(args.T);
            
            const target = this._getTarget(util);
            const time = Date.now() / 1000;
            
            const x = a * Math.sin(t * time + delta);
            const y = b * Math.sin(t * time);
            
            target.setXY(target.x + x, target.y + y);
        }

        // ========== Utility ==========

        degreesToRadians(args) {
            const deg = Cast.toNumber(args.DEG);
            return deg * Math.PI / 180;
        }

        radiansToDegrees(args) {
            const rad = Cast.toNumber(args.RAD);
            return rad * 180 / Math.PI;
        }

        normalizeAngle(args) {
            const angle = Cast.toNumber(args.ANGLE);
            return this._normalizeAngle(angle);
        }

        _normalizeAngle(angle) {
            angle = angle % 360;
            if (angle < 0) angle += 360;
            return angle;
        }

        distanceToPoint(args, util) {
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const target = this._getTarget(util);
            const dx = x - target.x;
            const dy = y - target.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        angleToPoint(args, util) {
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const target = this._getTarget(util);
            const dx = x - target.x;
            const dy = y - target.y;
            let angle = Math.atan2(dy, dx) * 180 / Math.PI - 90;
            return this._normalizeAngle(angle);
        }

        getMotionProperty(args, util) {
            const spriteName = Cast.toString(args.SPRITE);
            const property = Cast.toString(args.PROPERTY);
            
            // Get the target (sprite) to query
            let target;
            if (spriteName === '_myself_') {
                target = util.target;
            } else {
                target = this._getTargetByName(spriteName);
            }
            
            if (!target) {
                if (property === 'velocityVector' || property === 'positionVector' || 
                    property === 'velocityVectorPolar' || property === 'positionVectorPolar') {
                    return JSON.stringify([0, 0]);
                }
                return 0;
            }
            
            switch(property) {
                case 'speed':
                    // Calculate speed (magnitude of velocity)
                    if (target._lastPosition) {
                        const dx = target.x - target._lastPosition.x;
                        const dy = target.y - target._lastPosition.y;
                        return Math.sqrt(dx * dx + dy * dy);
                    }
                    return 0;
                    
                case 'velocityVector':
                    // Return velocity as JSON vector [vx, vy]
                    if (target._lastPosition) {
                        const vx = target.x - target._lastPosition.x;
                        const vy = target.y - target._lastPosition.y;
                        return JSON.stringify([vx, vy]);
                    }
                    return JSON.stringify([0, 0]);
                    
                case 'positionVector':
                    // Return position as JSON vector [x, y]
                    return JSON.stringify([target.x, target.y]);
                    
                case 'x':
                    // Return x coordinate
                    return target.x;
                    
                case 'y':
                    // Return y coordinate
                    return target.y;
                    
                case 'direction':
                    // Return direction (Scratch angle)
                    return target.direction;
                    
                case 'positionVectorPolar':
                    // Return position as polar coordinates [radius, angle]
                    const radius = Math.sqrt(target.x * target.x + target.y * target.y);
                    let angle = Math.atan2(target.y, target.x) * 180 / Math.PI - 90;
                    // Normalize angle to Scratch convention (0-360)
                    angle = this._normalizeAngle(angle);
                    return JSON.stringify([radius, angle]);
                    
                case 'velocityVectorPolar':
                    // Return velocity as polar coordinates [speed, direction]
                    if (target._lastPosition) {
                        const vx = target.x - target._lastPosition.x;
                        const vy = target.y - target._lastPosition.y;
                        const speed = Math.sqrt(vx * vx + vy * vy);
                        let vAngle = Math.atan2(vy, vx) * 180 / Math.PI - 90;
                        vAngle = this._normalizeAngle(vAngle);
                        return JSON.stringify([speed, vAngle]);
                    }
                    return JSON.stringify([0, 0]);
                    
                default:
                    return 0;
            }
        }

        getWaypointProperty(args, util) {
            const waypointName = Cast.toString(args.WAYPOINT);
            const property = Cast.toString(args.PROPERTY);
            
            const waypoint = this._waypoints[waypointName];
            if (!waypoint) {
                // Waypoint doesn't exist
                return property === 'tolerance' ? 5 : 0;
            }
            
            return waypoint[property] !== undefined ? waypoint[property] : 0;
        }

        isOnWaypoint(args, util) {
            const waypointName = Cast.toString(args.WAYPOINT);
            const target = this._getTarget(util);
            
            const waypoint = this._waypoints[waypointName];
            if (!waypoint) {
                return false;
            }
            
            // Calculate distance to waypoint
            const dist = Math.sqrt(
                Math.pow(target.x - waypoint.x, 2) + 
                Math.pow(target.y - waypoint.y, 2)
            );
            
            // Check if within tolerance
            return dist <= waypoint.tolerance;
        }

        waypointName(args) {
            const waypointName = Cast.toString(args.WAYPOINT);
            return waypointName;
        }

        thetaAngle(args, util) {
            const target = this._getTarget(util);
            let angle = Math.atan2(target.y, target.x) * 180 / Math.PI - 90;
            return this._normalizeAngle(angle);
        }

        rLength(args, util) {
            const target = this._getTarget(util);
            return Math.sqrt(target.x * target.x + target.y * target.y);
        }

        // ========== Integration with Vector and Coordinate extensions ==========

        _parseVector(vectorString) {
            try {
                const vector = JSON.parse(vectorString);
                if (Array.isArray(vector) && vector.length >= 2) {
                    return { x: Cast.toNumber(vector[0]), y: Cast.toNumber(vector[1]) };
                }
            } catch (e) {
                // Try to parse as "[x, y]" format
                const match = vectorString.match(/\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?/);
                if (match) {
                    return { x: Cast.toNumber(match[1]), y: Cast.toNumber(match[2]) };
                }
            }
            return { x: 0, y: 0 };
        }

        _getCoordinateSystem(name) {
            // Try to get coordinate system from Tom's Coordinate Transform extension
            if (this.runtime.ext_theTomsCoordinateTransform && 
                this.runtime.ext_theTomsCoordinateTransform.coordinateSystems) {
                return this.runtime.ext_theTomsCoordinateTransform.coordinateSystems[name];
            }
            return null;
        }

        _applyCoordinateSystem(x, y) {
            if (!this.currentCoordSystem) {
                return { x, y };
            }
            // Apply coordinate system transform
            const coordSys = this._getCoordinateSystem(this.currentCoordSystem);
            if (coordSys && coordSys.transform) {
                return coordSys.transform(x, y);
            }
            return { x, y };
        }

        vector(args) {
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            return JSON.stringify([x, y]);
        }

        goToVector(args, util) {
            const vector = this._parseVector(Cast.toString(args.VECTOR));
            const target = this._getTarget(util);
            
            // Apply coordinate system if set
            const transformed = this._applyCoordinateSystem(vector.x, vector.y);
            target.setXY(transformed.x, transformed.y);
        }

        moveByVector(args, util) {
            const vector = this._parseVector(Cast.toString(args.VECTOR));
            const target = this._getTarget(util);
            
            // Apply coordinate system if set
            const transformed = this._applyCoordinateSystem(vector.x, vector.y);
            target.setXY(target.x + transformed.x, target.y + transformed.y);
        }

        setCoordinateSystem(args) {
            let coordSys = Cast.toString(args.COORD_SYS);
            
            // 尝试解析 JSON 格式（来自"获取坐标系全部属性"积木的输出）
            try {
                const parsed = JSON.parse(coordSys);
                // 如果是对象，尝试从中提取坐标系名称
                if (parsed && typeof parsed === 'object') {
                    // 检查是否是坐标系属性对象（包含 xx, xy, yx, yy 等属性）
                    if (parsed.hasOwnProperty('xx') || parsed.hasOwnProperty('rotation')) {
                        // 这是坐标系属性对象，需要查找匹配的坐标系名称
                        coordSys = this._findCoordinateSystemByProperties(parsed);
                    }
                }
            } catch (e) {
                // 不是 JSON，直接使用字符串作为坐标系名称
            }
            
            this.currentCoordSystem = coordSys;
        }

        // 根据属性查找坐标系名称
        _findCoordinateSystemByProperties(properties) {
            if (!this.runtime.ext_theTomsCoordinateTransform) {
                return '';
            }
            
            const ext = this.runtime.ext_theTomsCoordinateTransform;
            
            // 遍历所有坐标系，查找匹配的属性
            if (ext.coordinateSystems) {
                for (const [name, coordSys] of Object.entries(ext.coordinateSystems)) {
                    if (coordSys.getProperty) {
                        const allProps = coordSys.getProperty('all');
                        if (this._compareCoordinateProperties(allProps, properties)) {
                            return name;
                        }
                    }
                }
            }
            
            if (ext.secureCoordinateSystems) {
                for (const [name, coordSys] of Object.entries(ext.secureCoordinateSystems)) {
                    if (coordSys.getProperty) {
                        const allProps = coordSys.getProperty('all');
                        if (this._compareCoordinateProperties(allProps, properties)) {
                            return name;
                        }
                    }
                }
            }
            
            return '';
        }

        // 比较两个坐标系属性是否匹配
        _compareCoordinateProperties(props1, props2) {
            const keys = ['xx', 'xy', 'xt', 'yx', 'yy', 'yt', 'rotation', 'scaleX', 'scaleY'];
            for (const key of keys) {
                if (props1[key] !== undefined && props2[key] !== undefined) {
                    // 允许小误差
                    if (Math.abs(props1[key] - props2[key]) > 0.0001) {
                        return false;
                    }
                }
            }
            return true;
        }

        resetCoordinateSystem() {
            this.currentCoordSystem = null;
        }

        // ========== Movement Event ==========

        whenMoved(args, util) {
            // Hat block - check if this target is the one that moved
            // The move info is stored on the target that moved
            if (util.target._lastMoveInfo) {
                return true;
            }
            return false;
        }

        movedFromX(args, util) {
            // Get from hat parameter (CCW platform)
            if (args.x_before_moving !== undefined) {
                return args.x_before_moving;
            }
            // Fallback to stored info on target
            const info = util.target._lastMoveInfo;
            return info ? info.fromX : 0;
        }

        movedFromY(args, util) {
            if (args.y_before_moving !== undefined) {
                return args.y_before_moving;
            }
            const info = util.target._lastMoveInfo;
            return info ? info.fromY : 0;
        }

        movedToX(args, util) {
            if (args.x_after_moving !== undefined) {
                return args.x_after_moving;
            }
            const info = util.target._lastMoveInfo;
            return info ? info.toX : 0;
        }

        movedToY(args, util) {
            if (args.y_after_moving !== undefined) {
                return args.y_after_moving;
            }
            const info = util.target._lastMoveInfo;
            return info ? info.toY : 0;
        }

        // ========== Move Listen Control ==========

        _getTargetByName(name) {
            const runtime = this.runtime;
            const targets = runtime.targets;
            
            // Check if it's the stage
            if (name === '_stage_' || name === '舞台') {
                return runtime.getTargetForStage();
            }
            
            // Check if it's myself
            if (name === '_myself_') {
                return null; // Will be handled by util.target
            }
            
            // Find target by name
            for (const target of targets) {
                if (target.sprite && target.sprite.name === name) {
                    return target;
                }
            }
            
            return null;
        }

        // ========== Group Management ==========

        createGroup(args, util) {
            const groupName = Cast.toString(args.NAME);
            
            // Get dynamic args using the helper function
            const sprites = getDynamicArgs(args);
            
            // Create or update group
            this._groups[groupName] = sprites;
        }

        addToGroup(args, util) {
            const groupName = Cast.toString(args.NAME);
            const spriteName = Cast.toString(args.SPRITE);
            
            if (!this._groups[groupName]) {
                this._groups[groupName] = [];
            }
            
            // Add sprite if not already in group
            if (!this._groups[groupName].includes(spriteName)) {
                this._groups[groupName].push(spriteName);
            }
        }

        removeFromGroup(args, util) {
            const groupName = Cast.toString(args.NAME);
            const spriteName = Cast.toString(args.SPRITE);
            
            if (this._groups[groupName]) {
                const index = this._groups[groupName].indexOf(spriteName);
                if (index > -1) {
                    this._groups[groupName].splice(index, 1);
                }
            }
        }

        getGroupMembers(args, util) {
            const groupName = Cast.toString(args.NAME);
            
            if (this._groups[groupName]) {
                return JSON.stringify(this._groups[groupName]);
            }
            return '[]';
        }

        moveGroup(args, util) {
            const groupName = Cast.toString(args.NAME);
            const distance = Cast.toNumber(args.DISTANCE);
            const angle = Cast.toNumber(args.ANGLE);
            const radians = this._scrAngleToJsAngle(angle);
            
            if (!this._groups[groupName]) return;
            
            const dx = distance * Math.cos(radians);
            const dy = distance * Math.sin(radians);
            
            // Move all sprites in the group
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setXY(target.x + dx, target.y + dy);
                }
            });
        }

        goToGroupPosition(args, util) {
            const groupName = Cast.toString(args.NAME);
            const targetX = Cast.toNumber(args.X);
            const targetY = Cast.toNumber(args.Y);
            
            if (!this._groups[groupName]) return;
            
            // Calculate group center
            let centerX = 0;
            let centerY = 0;
            let count = 0;
            
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    centerX += target.x;
                    centerY += target.y;
                    count++;
                }
            });
            
            if (count === 0) return;
            
            centerX /= count;
            centerY /= count;
            
            // Calculate offset to move to target position
            const offsetX = targetX - centerX;
            const offsetY = targetY - centerY;
            
            // Move all sprites by the offset
            this._groups[groupName].forEach(spriteName => {
                const target = this._getTargetByName(spriteName);
                if (target) {
                    target.setXY(target.x + offsetX, target.y + offsetY);
                }
            });
        }

        // ========== Move Listen Control ==========

        setMoveListen(args, util) {
            const spriteName = Cast.toString(args.SPRITE);
            const listenState = Cast.toString(args.LISTEN);
            
            let target;
            if (spriteName === '' || spriteName === '_myself_') {
                target = util.target;
            } else {
                target = this._getTargetByName(spriteName);
            }
            
            if (!target) return;
            
            // Store on target object directly
            target._moveListenState = (listenState === 'listening');
        }

        isMoveListen(args, util) {
            const spriteName = Cast.toString(args.SPRITE);
            
            let target;
            if (spriteName === '' || spriteName === '_myself_') {
                target = util.target;
            } else {
                target = this._getTargetByName(spriteName);
            }
            
            if (!target) return false;
            
            // Check on target object directly (default is true)
            return target._moveListenState !== false;
        }

        createWaypoint(args, util) {
            const name = Cast.toString(args.NAME);
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const tolerance = Cast.toNumber(args.TOLERANCE);
            
            // Create or update waypoint with tolerance
            this._waypoints[name] = { x, y, tolerance: Math.max(0, tolerance) };
        }

        whenOnWaypoint(args, util) {
            // Hat block - check if this target recently reached a waypoint
            // Store a flag on target when waypoint is reached
            if (util.target._onWaypoint) {
                delete util.target._onWaypoint;  // Clear flag after check
                return true;
            }
            return false;
        }

        async customMotion(args, util) {
            const name = Cast.toString(args.NAME);
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const extra = {};
            const target = this._getTarget(util);
            
            // Store motion data and trigger hat block
            const motionData = {
                x: x,
                y: y,
                extra: extra
            };
            
            // Store on util.target for the hat block to access
            util.target._customMotionData = motionData;
            
            // Trigger the whenCustomMotion hat block
            this._lastCustomMotionData = motionData;
            if (this.runtime) {
                this.runtime.startHats(`${EXTENSION_ID}_whenCustomMotion`);
            }
        }

        whenCustomMotion(args, util) {
            // Hat block - check if this target has custom motion data
            if (util.target._customMotionData) {
                // Clear flag after check
                delete util.target._customMotionData;
                return true;
            }
            return false;
        }

        repeatUntilReach(args, util) {
            const targetX = Cast.toNumber(args.X);
            const targetY = Cast.toNumber(args.Y);
            const tolerance = Cast.toNumber(args.TOLERANCE);
            const target = util.target;
            
            // Calculate distance to target
            const dist = Math.sqrt(
                Math.pow(target.x - targetX, 2) + 
                Math.pow(target.y - targetY, 2)
            );
            
            // If not reached yet, execute the branch and loop
            if (dist > tolerance) {
                // Execute branch 0 (the C-slot content) and continue looping
                util.startBranch(1, true);
            }
            // If reached, do nothing (loop ends)
        }

        repeatUntilFacing(args, util) {
            const targetDirection = Cast.toNumber(args.DIRECTION);
            const tolerance = Cast.toNumber(args.TOLERANCE);
            const target = util.target;
            
            // Get current direction (Scratch uses degrees, 0 = up, 90 = right)
            const currentDirection = target.direction;
            
            // Calculate angle difference (handling wrap-around at 360 degrees)
            let angleDiff = Math.abs(currentDirection - targetDirection);
            if (angleDiff > 180) {
                angleDiff = 360 - angleDiff;
            }
            
            // If not facing target yet, execute the branch and loop
            if (angleDiff > tolerance) {
                // Execute branch 0 (the C-slot content) and continue looping
                util.startBranch(1, true);
            }
            // If facing target, do nothing (loop ends)
        }

        lastWaypointName() {
            return this._lastWaypointName || '';
        }

        customMotionX() {
            return this._lastCustomMotionData ? this._lastCustomMotionData.x : 0;
        }

        customMotionY() {
            return this._lastCustomMotionData ? this._lastCustomMotionData.y : 0;
        }

        customMotionExtraArgs() {
            return this._lastCustomMotionData ? JSON.stringify(this._lastCustomMotionData.extra || {}) : '{}';
        }
    }

    Scratch.extensions.register(new MoreMotion(Scratch.runtime));

})(Scratch);
