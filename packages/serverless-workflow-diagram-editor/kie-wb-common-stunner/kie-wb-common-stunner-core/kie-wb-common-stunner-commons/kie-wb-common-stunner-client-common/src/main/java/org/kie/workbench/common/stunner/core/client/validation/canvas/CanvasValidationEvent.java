/*
 * Copyright 2017 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.kie.workbench.common.stunner.core.client.validation.canvas;

import org.jboss.errai.common.client.api.annotations.NonPortable;

@NonPortable
public class CanvasValidationEvent {

    private final String uuid;
    private final String diagramName;
    private final String diagramTitle;

    public CanvasValidationEvent(final String uuid,
                                 final String diagramName,
                                 final String diagramTitle) {
        this.uuid = uuid;
        this.diagramName = diagramName;
        this.diagramTitle = diagramTitle;
    }

    public String getCanvasHandlerUUID() {
        return uuid;
    }

    public String getDiagramTitle() {
        return diagramTitle;
    }

    public String getDiagramName() {
        return diagramName;
    }
}
